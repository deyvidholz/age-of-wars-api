import { Country } from '../country/country.entity';
import { Game } from '../game/game.entity';
import {
  DemandType,
  OfferType,
  PeaceRequest,
  PeaceRequestType,
  War,
  WarParticipant,
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

  static getAttackers(
    game: Game,
    war: War,
    removeProvinces: boolean = true
  ): Country[] {
    return WarHelper.getParticipants(game, war, removeProvinces).attackers;
  }

  static getVictims(
    game: Game,
    war: War,
    removeProvinces: boolean = true
  ): Country[] {
    return WarHelper.getParticipants(game, war, removeProvinces).victims;
  }

  static getParticipants(
    game: Game,
    war: War,
    removeProvinces: boolean = true
  ): GetParticipantsReturn {
    const attackerIds = [
      war.details.attacker.id,
      ...war.details.attacker.allies.map((ally) => ally.id),
    ];
    const victimIds = [
      war.details.victim.id,
      ...war.details.victim.allies.map((ally) => ally.id),
    ];

    let attackers = game.countries.filter((country) =>
      attackerIds.includes(country.name)
    );
    let victims = game.countries.filter((country) =>
      victimIds.includes(country.name)
    );

    if (removeProvinces) {
      attackers = attackers.map((country) => {
        delete country.provinces;
        return country;
      });

      victims = victims.map((country) => {
        delete country.provinces;
        return country;
      });
    }

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
