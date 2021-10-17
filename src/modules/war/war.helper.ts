import { CountryPassiveType } from '../../data/templates/country-passives.template';
import { MathHelper } from '../../helpers/math.helper';
import { Operation } from '../../typing/general.typing';
import { Country } from '../country/country.entity';
import { CountryHelper } from '../country/country.helper';
import { Army, MilitaryPower } from '../country/country.typing';
import { Game } from '../game/game.entity';
import { PassiveHelper } from '../passive/passive.helper';
import {
  DemandType,
  Losses,
  LossesBySide,
  OfferType,
  PeaceRequest,
  PeaceRequestType,
  War,
  WarComparedInfo,
  WarComparedInfoCountry,
  WarDetails,
  WarParticipant,
  WarParticipantType,
} from './war.typing';

export class WarHelper {
  static getWarParticipantMounted(country: Country): WarParticipant {
    return {
      id: country.id,
      flag: country.flag,
      name: country.name,
      losses: {
        aircrafts: 0,
        balance: 0,
        divisions: 0,
        tanks: 0,
        warships: 0,
      },
    };
  }

  static getAttackers(game: Game, war: War): Country[] {
    return WarHelper.getParticipants(game, war).attackers;
  }

  static getVictims(game: Game, war: War): Country[] {
    return WarHelper.getParticipants(game, war).victims;
  }

  static getParticipants(game: Game, war: War): GetParticipantsReturn {
    const attackerIds = [
      war.details.attacker.id,
      ...war.details.attacker.allies.map((ally) => ally.id),
    ];
    const victimIds = [
      war.details.victim.id,
      ...war.details.victim.allies.map((ally) => ally.id),
    ];

    let attackers = game.countries.filter((country) =>
      attackerIds.includes(country.id)
    );
    let victims = game.countries.filter((country) =>
      victimIds.includes(country.id)
    );

    return {
      attackers,
      victims,
    };
  }

  static givePeaceRequestStuff(data: GivePeaceRequestStuffParam) {
    const offers = data.peaceRequest.offers || [];
    const demands = data.peaceRequest.demands || [];

    for (const demandOffer of [...offers, ...demands]) {
      const { peaceRequestType } = demandOffer;
      switch (demandOffer.type) {
        case peaceRequestType === PeaceRequestType.DEMAND && DemandType.BALANCE:
          data.requester.economy.balance += demandOffer.economy.balance;
          data.target.economy.balance -= demandOffer.economy.balance;
          break;

        case peaceRequestType === PeaceRequestType.DEMAND && DemandType.OIL:
          data.requester.resources.oil += demandOffer.resources.oil;
          data.target.resources.oil -= demandOffer.resources.oil;
          break;

        case peaceRequestType === PeaceRequestType.DEMAND &&
          DemandType.PROVINCE:
          let mapRefs = demandOffer.provinces.map(
            (province) => province.mapRef
          );
          let provinces = data.target.provinces.filter((province) =>
            mapRefs.includes(province.mapRef)
          );
          data.target.provinces = data.target.provinces.filter(
            (province) => !mapRefs.includes(province.mapRef)
          );
          data.requester.provinces.push(...provinces);
          break;

        case peaceRequestType === PeaceRequestType.OFFER && OfferType.BALANCE:
          data.target.economy.balance += demandOffer.economy.balance;
          data.requester.economy.balance -= demandOffer.economy.balance;
          break;

        case peaceRequestType === PeaceRequestType.OFFER && OfferType.OIL:
          data.target.resources.oil += demandOffer.resources.oil;
          data.requester.resources.oil -= demandOffer.resources.oil;
          break;

        case peaceRequestType === PeaceRequestType.OFFER && OfferType.PROVINCE:
          mapRefs = demandOffer.provinces.map((province) => province.mapRef);
          provinces = data.requester.provinces.filter((province) =>
            mapRefs.includes(province.mapRef)
          );
          data.requester.provinces = data.target.provinces.filter(
            (province) => !mapRefs.includes(province.mapRef)
          );
          data.target.provinces.push(...provinces);
          break;
      }
    }
  }

  static isParticipating(war: War, countryId: string): boolean {
    return (
      war.details.attacker.id === countryId ||
      war.details.victim.id === countryId ||
      war.details.attacker.allies.some((ally) => ally.id === countryId) ||
      war.details.victim.allies.some((ally) => ally.id === countryId)
    );
  }

  static isWarOwner(war: War, countryId: string): boolean {
    return (
      war.details.attacker.id === countryId ||
      war.details.victim.id === countryId
    );
  }

  static removeParticipant(war: War, countryId: string): War {
    war.details.attacker.allies ===
      war.details.attacker.allies.filter((ally) => ally.id !== countryId);

    war.details.victim.allies ===
      war.details.victim.allies.filter((ally) => ally.id !== countryId);

    return war;
  }

  static isAttacker(war: War, countryId: string) {
    const attackers = [
      ...war.details.attacker.allies,
      {
        id: war.details.attacker.id,
        flag: war.details.attacker.flag,
        name: war.details.attacker.name,
      },
    ];

    return attackers.some((attacker) => attacker.id === countryId);
  }

  static isVictim(war: War, countryId: string) {
    const victims = [
      ...war.details.victim.allies,
      {
        id: war.details.victim.id,
        flag: war.details.victim.flag,
        name: war.details.victim.name,
      },
    ];

    return victims.some((victim) => victim.id === countryId);
  }

  static getMpDiff(
    countries: Country[],
    warParticipantType: WarParticipantType
  ): {
    mpTotal: MilitaryPower;
    mpDiffByCountry: WarComparedInfoCountry[];
  } {
    const countriesTotalMp = CountryHelper.compareMilitaryPowers({
      countries,
      warParticipantType,
    }).total;

    let mps: {
      mpTotal: MilitaryPower;
      mpDiffByCountry: WarComparedInfoCountry[];
    } = {
      mpTotal: countriesTotalMp,
      mpDiffByCountry: [],
    };

    if (countries.length === 1) {
      const countryMpDiffBetweenAllies: MilitaryPower = {
        total: 100,
        aircrafts: 100,
        divisions: 100,
        tanks: 100,
        warships: 100,
      };

      mps.mpDiffByCountry.push({
        country: countries[0].getCountrySimplifiedData(),
        militaryPower: countries[0].militaryPower,
        powerDiffBetweenAllies: countryMpDiffBetweenAllies,
      });
    } else {
      for (const country of countries) {
        const mp = country.militaryPower;

        const countryMpDiffBetweenAllies: MilitaryPower = {
          total: 100 - MathHelper.percentDiff(countriesTotalMp.total, mp.total),
          aircrafts:
            100 -
            MathHelper.percentDiff(countriesTotalMp.aircrafts, mp.aircrafts),
          divisions:
            100 -
            MathHelper.percentDiff(countriesTotalMp.divisions, mp.divisions),
          tanks: 100 - MathHelper.percentDiff(countriesTotalMp.tanks, mp.tanks),
          warships:
            100 -
            MathHelper.percentDiff(countriesTotalMp.warships, mp.warships),
        };

        mps.mpDiffByCountry.push({
          country: country.getCountrySimplifiedData(),
          militaryPower: country.militaryPower,
          powerDiffBetweenAllies: countryMpDiffBetweenAllies,
        });
      }
    }

    return mps;
  }

  static getComparedInfo(
    game: Game,
    war: War,
    attackers?: Country[],
    victims?: Country[]
  ): WarComparedInfo {
    attackers = attackers || WarHelper.getAttackers(game, war);
    victims = victims || WarHelper.getVictims(game, war);

    const mpDiff = {
      attackers: WarHelper.getMpDiff(attackers, WarParticipantType.ATTACKER),
      victims: WarHelper.getMpDiff(victims, WarParticipantType.VICTIM),
    };

    const attackersPowerDiff: MilitaryPower = {
      total: MathHelper.percentDiff(
        mpDiff.attackers.mpTotal.total,
        mpDiff.victims.mpTotal.total
      ),
      divisions: MathHelper.percentDiff(
        mpDiff.attackers.mpTotal.divisions,
        mpDiff.victims.mpTotal.divisions
      ),
      tanks: MathHelper.percentDiff(
        mpDiff.attackers.mpTotal.tanks,
        mpDiff.victims.mpTotal.tanks
      ),
      aircrafts: MathHelper.percentDiff(
        mpDiff.attackers.mpTotal.aircrafts,
        mpDiff.victims.mpTotal.aircrafts
      ),
      warships: MathHelper.percentDiff(
        mpDiff.attackers.mpTotal.warships,
        mpDiff.victims.mpTotal.warships
      ),
    };

    const victimsPowerDiff: MilitaryPower = {
      total: MathHelper.percentDiff(
        mpDiff.victims.mpTotal.total,
        mpDiff.attackers.mpTotal.total
      ),
      divisions: MathHelper.percentDiff(
        mpDiff.victims.mpTotal.divisions,
        mpDiff.attackers.mpTotal.divisions
      ),
      tanks: MathHelper.percentDiff(
        mpDiff.victims.mpTotal.tanks,
        mpDiff.attackers.mpTotal.tanks
      ),
      aircrafts: MathHelper.percentDiff(
        mpDiff.victims.mpTotal.aircrafts,
        mpDiff.attackers.mpTotal.aircrafts
      ),
      warships: MathHelper.percentDiff(
        mpDiff.victims.mpTotal.warships,
        mpDiff.attackers.mpTotal.warships
      ),
    };

    const info = {
      attackers: mpDiff.attackers.mpDiffByCountry,
      victims: mpDiff.victims.mpDiffByCountry,
      attackersPowerDiff,
      victimsPowerDiff,
    };

    return info;
  }

  static getLosses(
    game: Game,
    war: War,
    comparedInfo?: WarComparedInfo
  ): LossesBySide {
    if (!comparedInfo) {
      comparedInfo = WarHelper.getComparedInfo(game, war);
    }

    const powerDiff = {
      total: Math.abs(comparedInfo.attackersPowerDiff.total),
      divisions: Math.abs(comparedInfo.attackersPowerDiff.divisions),
      tanks: Math.abs(comparedInfo.attackersPowerDiff.tanks),
      aircrafts: Math.abs(comparedInfo.attackersPowerDiff.aircrafts),
      warships: Math.abs(comparedInfo.attackersPowerDiff.warships),
    };

    const defaultLosses: Losses = {
      aircrafts: 0,
      balance: 0,
      divisions: 0,
      tanks: 0,
      warships: 0,
    };

    const lossesBySide: LossesBySide = {
      attackers: {
        ...defaultLosses,
      },
      victims: {
        ...defaultLosses,
      },
    };

    const loserLosses: Losses = {
      aircrafts: MathHelper.getPercetageValue(
        powerDiff.aircrafts,
        powerDiff.aircrafts,
        true
      ),
      balance: MathHelper.getPercetageValue(
        powerDiff.total,
        powerDiff.total,
        true
      ),
      divisions: MathHelper.getPercetageValue(
        powerDiff.divisions,
        powerDiff.divisions,
        true
      ),
      tanks: MathHelper.getPercetageValue(
        powerDiff.tanks,
        powerDiff.tanks,
        true
      ),
      warships: MathHelper.getPercetageValue(
        powerDiff.warships,
        powerDiff.warships,
        true
      ),
    };

    const winnerLosses: Losses = {
      aircrafts: MathHelper.subtractByPercentage(
        loserLosses.aircrafts,
        powerDiff.aircrafts
      ),
      balance: MathHelper.subtractByPercentage(
        loserLosses.balance,
        powerDiff.total
      ),
      divisions: MathHelper.subtractByPercentage(
        loserLosses.divisions,
        powerDiff.divisions
      ),
      tanks: MathHelper.subtractByPercentage(
        loserLosses.tanks,
        powerDiff.tanks
      ),
      warships: MathHelper.subtractByPercentage(
        loserLosses.warships,
        powerDiff.warships
      ),
    };

    const attackersAreWinning =
      comparedInfo.attackersPowerDiff.total >
      comparedInfo.victimsPowerDiff.total;

    if (attackersAreWinning) {
      // Attackers are winning
      console.log('attackers are winning');

      // Inverting losses based on MP
      const [
        victimsHasMoreDivisions,
        victimsHasMoreTanks,
        victimsHasMoreAircrafts,
        victimsHasMoreWarships,
      ] = [
        comparedInfo.victimsPowerDiff.divisions >
          comparedInfo.attackersPowerDiff.divisions,
        comparedInfo.victimsPowerDiff.tanks >
          comparedInfo.attackersPowerDiff.tanks,
        comparedInfo.victimsPowerDiff.aircrafts >
          comparedInfo.attackersPowerDiff.aircrafts,
        comparedInfo.victimsPowerDiff.warships >
          comparedInfo.attackersPowerDiff.warships,
      ];

      if (victimsHasMoreDivisions) {
        let current = [loserLosses.divisions, winnerLosses.divisions];
        winnerLosses.divisions = current[0];
        loserLosses.divisions = current[1];
      }

      if (victimsHasMoreTanks) {
        let current = [loserLosses.tanks, winnerLosses.tanks];
        winnerLosses.tanks = current[0];
        loserLosses.tanks = current[1];
      }

      if (victimsHasMoreAircrafts) {
        let current = [loserLosses.aircrafts, winnerLosses.aircrafts];
        winnerLosses.aircrafts = current[0];
        loserLosses.aircrafts = current[1];
      }

      if (victimsHasMoreWarships) {
        let current = [loserLosses.warships, winnerLosses.warships];
        winnerLosses.warships = current[0];
        loserLosses.warships = current[1];
      }

      lossesBySide.attackers = winnerLosses;
      lossesBySide.victims = loserLosses;
    } else {
      // Victims are winning
      console.log('victims are winning');

      // Inverting losses based on MP
      const [
        attackersHasMoreDivisions,
        attackersHasMoreTanks,
        attackersHasMoreAircrafts,
        attackersHasMoreWarships,
      ] = [
        comparedInfo.attackersPowerDiff.divisions >
          comparedInfo.victimsPowerDiff.divisions,

        comparedInfo.attackersPowerDiff.tanks >
          comparedInfo.victimsPowerDiff.tanks,

        comparedInfo.attackersPowerDiff.aircrafts >
          comparedInfo.victimsPowerDiff.aircrafts,

        comparedInfo.attackersPowerDiff.warships >
          comparedInfo.victimsPowerDiff.warships,
      ];

      if (attackersHasMoreDivisions) {
        let current = [loserLosses.divisions, winnerLosses.divisions];
        winnerLosses.divisions = current[0];
        loserLosses.divisions = current[1];
      }

      if (attackersHasMoreTanks) {
        let current = [loserLosses.tanks, winnerLosses.tanks];
        winnerLosses.tanks = current[0];
        loserLosses.tanks = current[1];
      }

      if (attackersHasMoreAircrafts) {
        let current = [loserLosses.aircrafts, winnerLosses.aircrafts];
        winnerLosses.aircrafts = current[0];
        loserLosses.aircrafts = current[1];
      }

      if (attackersHasMoreWarships) {
        let current = [loserLosses.warships, winnerLosses.warships];
        winnerLosses.warships = current[0];
        loserLosses.warships = current[1];
      }

      lossesBySide.attackers = loserLosses;
      lossesBySide.victims = winnerLosses;
    }

    WarHelper.divideLosses(lossesBySide);
    return lossesBySide;
  }

  static divideLosses(lossesBySide: LossesBySide): LossesBySide {
    lossesBySide.attackers.divisions /= 3;
    lossesBySide.attackers.tanks /= 3;
    lossesBySide.attackers.aircrafts /= 3;
    lossesBySide.attackers.warships /= 3;

    lossesBySide.victims.divisions /= 3;
    lossesBySide.victims.tanks /= 3;
    lossesBySide.victims.aircrafts /= 3;
    lossesBySide.victims.warships /= 3;

    return lossesBySide;
  }

  static roundLosses(losses: Losses): Losses {
    losses.divisions = Math.round(losses.divisions);
    losses.tanks = Math.round(losses.tanks);
    losses.aircrafts = Math.round(losses.aircrafts);
    losses.warships = Math.round(losses.warships);

    return losses;
  }

  static fixLosses(losses: Losses): Losses {
    losses.divisions = WarHelper.getMaxLosses(losses.divisions);
    losses.tanks = WarHelper.getMaxLosses(losses.tanks);
    losses.aircrafts = WarHelper.getMaxLosses(losses.aircrafts);
    losses.warships = WarHelper.getMaxLosses(losses.warships);
    losses.balance = WarHelper.getMaxLosses(losses.balance);

    const keys = Object.keys(losses);

    for (const lossType of keys) {
      if (losses[lossType] < 0) {
        losses[lossType] = 0;
      }
    }

    return losses;
  }

  static getMaxLosses(qty: number): number {
    if (isNaN(qty)) {
      return 0;
    }

    if (qty === Infinity) {
      return 9999999;
    }

    return qty;
  }

  static getSpllitedLosses(
    comparedInfo: WarComparedInfo,
    lossesBySide: LossesBySide,
    fixLosses?: boolean
  ): Losses[] {
    const splittedLosses: Losses[] = [];

    for (const info of comparedInfo.attackers) {
      const { country, powerDiffBetweenAllies } = info;
      let losses = WarHelper.getLossesByPercentage(
        powerDiffBetweenAllies,
        lossesBySide.attackers
      );

      losses.country = country;
      losses.isAttacker = true;

      if (fixLosses) {
        losses = WarHelper.roundLosses(losses);
        losses = WarHelper.fixLosses(losses);
      }

      splittedLosses.push(losses);
    }

    for (const info of comparedInfo.victims) {
      const { country, powerDiffBetweenAllies } = info;
      let losses = WarHelper.getLossesByPercentage(
        powerDiffBetweenAllies,
        lossesBySide.victims
      );

      losses.country = country;
      losses.isAttacker = false;

      if (fixLosses) {
        losses = WarHelper.roundLosses(losses);
        losses = WarHelper.fixLosses(losses);
      }

      splittedLosses.push(losses);
    }

    return splittedLosses;
  }

  static getLossesByPercentage(
    powerDiffBetweenAllies: MilitaryPower,
    totalLosses: Losses
  ): Losses {
    const losses: Losses = {
      divisions: MathHelper.getPercetageValue(
        totalLosses.divisions,
        powerDiffBetweenAllies.divisions
      ),
      tanks: MathHelper.getPercetageValue(
        totalLosses.tanks,
        powerDiffBetweenAllies.tanks
      ),
      aircrafts: MathHelper.getPercetageValue(
        totalLosses.aircrafts,
        powerDiffBetweenAllies.aircrafts
      ),
      warships: MathHelper.getPercetageValue(
        totalLosses.warships,
        powerDiffBetweenAllies.warships
      ),
      balance: MathHelper.getPercetageValue(
        totalLosses.balance,
        powerDiffBetweenAllies.total
      ),
    };

    return losses;
  }

  static getLossesBasedOnArmy(Losses: Losses, army: Army): Losses {
    const keys = Object.keys(army);

    for (const armyType of keys) {
      if (Losses[armyType] > army[armyType]) {
        Losses[armyType] = army[armyType];
      }
    }

    return Losses;
  }

  static setLosses(game: Game, war: War, splittedLosses: Losses[]) {
    for (let losses of splittedLosses) {
      if (!losses.country) {
        console.log('Warning: losses without country property found', {
          gameId: game.id,
          warId: war.id,
          losses,
        });
        continue;
      }

      const country = game.countries.find(
        (country) => country.id === losses.country.id
      );

      if (!country) {
        continue;
      }

      losses = WarHelper.getLossesBasedOnArmy(losses, country.army);
      const keys = Object.keys(country.army);
      const participant = WarHelper.getParticipant(war, country.id);

      const applyOnlyIncrease: CountryPassiveType[] = [
        CountryPassiveType.INCREASE_CASUALTIES,
      ];

      const applyOnlyDecrease: CountryPassiveType[] = [
        CountryPassiveType.DECREASE_CASUALTIES,
      ];

      if (losses.isAttacker) {
        applyOnlyIncrease.push(
          CountryPassiveType.INCREASE_CASUALTIES_OFFENSIVE_WAR
        );
      }

      if (!losses.isAttacker) {
        applyOnlyDecrease.push(
          CountryPassiveType.DECREASE_CASUALTIES_DEFENSIVE_WARS
        );
      }

      for (const armyType of keys) {
        losses[armyType] = PassiveHelper.applyPassives({
          applyOnly: applyOnlyIncrease,
          passives: country.getPassives(),
          value: losses[armyType],
          forceOperation: Operation.SUM,
        });

        losses[armyType] = PassiveHelper.applyPassives({
          applyOnly: applyOnlyDecrease,
          passives: country.getPassives(),
          value: losses[armyType],
          forceOperation: Operation.SUBTRACT,
        });

        const value = Math.ceil(losses[armyType]);

        participant.losses[armyType] += value;
        country.army[armyType] -= value;
      }
    }
  }

  static getParticipant(war: War, countryId: string): WarParticipant | null {
    if (war.details.attacker.id === countryId) {
      return war.details.attacker;
    }

    if (war.details.victim.id === countryId) {
      return war.details.victim;
    }

    return (
      war.details.attacker.allies.find((country) => country.id === countryId) ||
      war.details.victim.allies.find((country) => country.id === countryId)
    );
  }

  static setParticipationPercentage(warDetails: WarDetails) {
    const attackersLosses = [warDetails.attacker.losses];
    const victimsLosses = [warDetails.victim.losses];

    console.log('attackersLosses', attackersLosses);

    if (warDetails.attacker.allies.length) {
      attackersLosses.push(
        ...warDetails.attacker.allies.map((ally) => ally.losses)
      );
    }

    if (warDetails.victim.allies.length) {
      victimsLosses.push(
        ...warDetails.victim.allies.map((ally) => ally.losses)
      );
    }

    const attackersTotalLossesMp =
      WarHelper.sumLossesTotalMilitaryPower(attackersLosses);
    const victimsTotalLossesMp =
      WarHelper.sumLossesTotalMilitaryPower(victimsLosses);

    console.log('attackersTotalLossesMp', attackersTotalLossesMp);

    const attackerLossesMp = WarHelper.sumLossesTotalMilitaryPower([
      warDetails.attacker.losses,
    ]);
    const victimLossesMp = WarHelper.sumLossesTotalMilitaryPower([
      warDetails.victim.losses,
    ]);

    console.log('attackerLossesMp', attackerLossesMp);

    console.log(
      '>>>>>>>>>>',
      MathHelper.percentDiff(
        attackersTotalLossesMp.total,
        attackerLossesMp.total
      )
    );

    warDetails.attacker.participation =
      100 -
      MathHelper.percentDiff(
        attackersTotalLossesMp.total,
        attackerLossesMp.total
      );
    warDetails.victim.participation =
      100 -
      MathHelper.percentDiff(victimsTotalLossesMp.total, victimLossesMp.total);

    for (const ally of warDetails.attacker.allies) {
      const allyLossesMp = WarHelper.sumLossesTotalMilitaryPower([ally.losses]);
      ally.participation =
        100 -
        MathHelper.percentDiff(
          attackersTotalLossesMp.total,
          allyLossesMp.total
        );
    }

    for (const ally of warDetails.victim.allies) {
      const allyLossesMp = WarHelper.sumLossesTotalMilitaryPower([ally.losses]);
      ally.participation =
        100 -
        MathHelper.percentDiff(victimsTotalLossesMp.total, allyLossesMp.total);
    }
  }

  static sumTotalLosses(losses: Losses[]): Losses {
    return losses.reduce(
      (a, b) => ({
        aircrafts: a.aircrafts + b.aircrafts,
        balance: a.balance + b.balance,
        divisions: a.divisions + b.divisions,
        tanks: a.tanks + b.tanks,
        warships: a.warships + b.warships,
      }),
      {
        aircrafts: 0,
        balance: 0,
        divisions: 0,
        tanks: 0,
        warships: 0,
      }
    );
  }

  static sumLossesTotalMilitaryPower(mps: Losses[]): MilitaryPower {
    const mp = mps.reduce(
      (a, b) => ({
        aircrafts: a.aircrafts + b.aircrafts,
        divisions: a.divisions + b.divisions,
        tanks: a.tanks + b.tanks,
        warships: a.warships + b.warships,
        total: MathHelper.sumNumbers(
          a.aircrafts,
          b.aircrafts,
          a.divisions,
          b.divisions,
          a.tanks,
          b.tanks,
          a.warships,
          b.warships
        ),
      }),
      {
        aircrafts: 0,
        divisions: 0,
        tanks: 0,
        total: 0,
        warships: 0,
      }
    );

    return mp;
  }
}

type GetParticipantsReturn = {
  attackers: Country[];
  victims: Country[];
};

type GivePeaceRequestStuffParam = {
  requester: Country;
  target: Country;
  peaceRequest: PeaceRequest;
};
