import 'dotenv/config';
import { In, Raw } from 'typeorm';
import { validate } from 'uuid';
import { CountryPassiveValueType } from '../../data/templates/country-passives.template';
import { focuses } from '../../data/templates/focuses.template';
import { personalities } from '../../data/templates/personalities.template';
import { ProvincePassiveType } from '../../data/templates/province-passive.template';
import { countriesWorldAOWV1 } from '../../data/v1/countries.data';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { ActionType } from '../action/action.typing';
import { Game } from '../game/game.entity';
import { gameRepository } from '../game/game.repository';
import { Country } from './country.entity';
import { CountryHelper } from './country.helper';
import { countryRepository } from './country.repository';
import { Province, RankingType } from './country.typing';
import {
  CaculateAggressivenessCalcType,
  AggressivenessHelper,
} from './aggressiveness.helper';
import { WarParticipantType } from '../war/war.typing';
import { MathHelper } from '../../helpers/math.helper';

export class CountryService {
  static async getProvince(
    data: GetProvinceParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
      },
      select: ['id', 'countries'],
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data,
      });
    }

    // Optimize: Find province directly without building intermediate array
    const lowerMapRef = data.provinceMapRef?.toLowerCase();
    let province = null;

    for (const country of game.countries) {
      for (const prov of country.provinces) {
        if (prov?.mapRef?.toLowerCase() === lowerMapRef) {
          const isOwner = !country.isAi && country.owner?.id === data.playerId;
          const ownerCountry = { ...country, provinces: [] };

          province = {
            ...prov,
            isOwner,
            country: ownerCountry,
            ownerTotalProvinces: country.provinces.length,
          };
          break;
        }
      }
      if (province) break;
    }

    if (!province) {
      return ResponseHelper.error({
        message: 'Province not found',
        data,
      });
    }

    return ResponseHelper.success({
      data: { province },
    });
  }

  static async getCountriesSortedByRanking(
    data: GetCountriesSortedByRankingParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const { rankingType } = data;

    if (!rankingType) {
      return ResponseHelper.error({
        message: 'Invalid ranking type',
        data,
      });
    }

    const game =
      data.game ||
      (await gameRepository().findOne({
        where: {
          id: data.gameId,
        },
        select: ['id', 'countries'],
      }));

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data,
      });
    }

    let countries: any = game.countries;
    const opinions = [];

    // Optimize: Reduce code duplication by combining map and sort logic
    switch (rankingType) {
      case RankingType.INCOMING_BALANCE:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          incoming: country.incoming,
        })).sort(
          (a: any, b: any) =>
            b.incoming.balance - a.incoming.balance ||
            a.name.localeCompare(b.name)
        );
        break;

      case RankingType.INCOMING_OIL:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          incoming: country.incoming,
        })).sort(
          (a: any, b: any) =>
            b.incoming.oil - a.incoming.oil || a.name.localeCompare(b.name)
        );
        break;

      case RankingType.MILITARY_POWER:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          militaryPower: country.militaryPower,
        })).sort(
          (a: any, b: any) =>
            b.militaryPower.total - a.militaryPower.total ||
            a.name.localeCompare(b.name)
        );
        break;

      case RankingType.MILITARY_POWER_AIRCRAFTS:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          militaryPower: country.militaryPower,
        })).sort(
          (a: any, b: any) =>
            b.militaryPower.aircrafts - a.militaryPower.aircrafts ||
            a.name.localeCompare(b.name)
        );
        break;

      case RankingType.MILITARY_POWER_DIVISIONS:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          militaryPower: country.militaryPower,
        })).sort(
          (a: any, b: any) =>
            b.militaryPower.divisions - a.militaryPower.divisions ||
            a.name.localeCompare(b.name)
        );
        break;

      case RankingType.MILITARY_POWER_TANKS:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          militaryPower: country.militaryPower,
        })).sort(
          (a: any, b: any) =>
            b.militaryPower.tanks - a.militaryPower.tanks ||
            a.name.localeCompare(b.name)
        );
        break;

      case RankingType.MILITARY_POWER_WARSHIPS:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          militaryPower: country.militaryPower,
        })).sort(
          (a: any, b: any) =>
            b.militaryPower.warships - a.militaryPower.warships ||
            a.name.localeCompare(b.name)
        );
        break;

      case RankingType.OPINION:
        if (!data.countryId) {
          return ResponseHelper.error({
            message: 'Invalid country ID',
            data,
          });
        }

        const country =
          data.country ||
          game.countries.find(
            (country) =>
              country.id === data.countryId ||
              country.name?.toLowerCase() === data.countryId?.toLowerCase()
          );

        if (!country) {
          return ResponseHelper.error({
            message: 'Country not found',
            data,
          });
        }

        for (const target of game.countries) {
          if (!target.opinions[country.name]) {
            continue;
          }

          opinions.push({
            id: target.id,
            flag: target.flag,
            name: target.name,
            opinionValue: target.opinions[country.name].value,
          });
        }

        opinions.sort(
          (a: any, b: any) =>
            b.opinionValue - a.opinionValue || a.name.localeCompare(b.name)
        );

        return ResponseHelper.success({
          data: { opinions },
        });

      case RankingType.CURRENT_AGGRESSIVENESS:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          aggressiveness: country.aggressiveness,
        }));

        countries.sort(
          (a: any, b: any) =>
            b.aggressiveness.current - a.aggressiveness.current ||
            a.name.localeCompare(b.name)
        );
        break;
    }

    return ResponseHelper.success({
      data: { countries },
    });
  }

  static async getV1AvailabeCountries() {
    const countries = countriesWorldAOWV1.map((country) => country.name);
    countries.sort((a: any, b: any) => b.name - a.name);

    return ResponseHelper.success({
      data: { countries },
    });
  }

  static async getAvailableFocuses() {
    const allowChangeFocusEveryStage =
      +process.env.ALLOW_CHANGE_FOCUS_EVERY_STAGE;
    return ResponseHelper.success({
      data: { focuses, allowChangeFocusEveryStage },
    });
  }

  static async getAvailablePersonalities() {
    return ResponseHelper.success({
      data: { personalities },
    });
  }

  static async getCountry(data: GetCountryParam) {
    let country: Country;

    if (validate(data.countryId)) {
      country = await countryRepository().findOne(data.countryId);
    } else {
      country = await countryRepository().findOne({
        where: {
          name: Raw(
            (alias) => `LOWER(${alias}) = '${data.countryId.toLowerCase()}'`
          ),
          game: {
            id: data.gameId,
          },
        },
      });
    }

    if (!country) {
      return ResponseHelper.error({
        message: 'Country not found',
        data: { countryId: data.countryId },
      });
    }

    const isPlayerOwner =
      data.playerId && !country.isAi && data.playerId === country.owner?.id;

    if (isPlayerOwner) {
      country.estimatedArmy = country.army;
    }

    country.provinces.sort((a, b) => a.name.localeCompare(b.name));

    return ResponseHelper.success({
      data: { country },
    });
  }

  static async getCountries(data: GetCountriesParam) {
    const countries = await countryRepository().find({
      where: {
        name: In(data.countries),
      },
    });

    if (!countries.length) {
      return ResponseHelper.error({
        message: 'Country not found',
        data: { countries: data.countries },
      });
    }

    let playerCountry: Country;

    if (data.playerId) {
      playerCountry = countries.find(
        (country) => !country.isAi && country.owner.id === data.playerId
      );

      if (playerCountry) {
        playerCountry.estimatedArmy = playerCountry.army;
      }
    }

    return ResponseHelper.success({
      data: { countries },
    });
  }

  static async getWarSimulation(data: GetWarSimulationParam) {
    const game = data.game || (await gameRepository().findOne(data.gameId));

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: { gameId: data.gameId },
      });
    }

    // Optimize: Removing provinces to reduce payload size (in-place modification)
    if (data.removeProvinces) {
      for (const country of game.countries) {
        country.provinces = [];
      }
    }

    const attacker: Country = game.countries.find(
      (country) => country.name === data.attacker
    );
    const target: Country = game.countries.find(
      (country) => country.name === data.target
    );

    if (!attacker || !target) {
      return ResponseHelper.error({
        message: 'One or more partipants not found',
        data,
      });
    }

    let attackerAlliesNames = attacker.allies.map((ally) => ally.name);
    let targetAlliesNames = [
      ...target.allies.map((ally) => ally.name),
      ...target.independenceGuaranteedBy.map((ally) => ally.name),
    ];

    // Optimize: Use Sets for O(1) lookup instead of includes()
    if (data.exclude) {
      const excludeSet = new Set(data.exclude);
      attackerAlliesNames = attackerAlliesNames.filter(
        (countryName) => !excludeSet.has(countryName)
      );
    }

    if (data.include) {
      const includeSet = new Set(data.include);
      attackerAlliesNames = attackerAlliesNames.filter((countryName) =>
        includeSet.has(countryName)
      );
    }

    let participants: { attackers: Country[]; victims: Country[] } = {
      attackers: [],
      victims: [],
    };

    // Optimize: Use Sets for O(1) lookup when filtering countries
    const attackerAlliesSet = new Set(attackerAlliesNames);
    const targetAlliesSet = new Set(targetAlliesNames);

    const attackerAllies = game.countries.filter((country) =>
      attackerAlliesSet.has(country.name)
    );

    const targetAllies = game.countries.filter((country) =>
      targetAlliesSet.has(country.name)
    );

    participants.attackers.push(...attackerAllies);
    participants.victims.push(...targetAllies);

    const attackerMps = CountryHelper.compareMilitaryPowers({
      countries: [attacker, ...attackerAllies],
      warParticipantType: WarParticipantType.ATTACKER,
    });

    const victimMps = CountryHelper.compareMilitaryPowers({
      countries: [target, ...targetAllies],
      warParticipantType: WarParticipantType.VICTIM,
    });

    const totals = CountryHelper.sumWarMilitaryPowers({
      attackers: [attacker, ...attackerAllies],
      victims: [target, ...targetAllies],
    });

    totals.attackers.militaryPower.totals = attackerMps.total;
    totals.victims.militaryPower.totals = victimMps.total;

    attacker.militaryPower = attackerMps.mps.find(
      (mp) => mp.countryName === attacker.name
    );

    target.militaryPower = victimMps.mps.find(
      (mp) => mp.countryName === target.name
    );

    for (const country of participants.attackers) {
      country.militaryPower = attackerMps.mps.find(
        (mp) => mp.countryName === country.name
      );
    }

    for (const country of participants.victims) {
      country.militaryPower = victimMps.mps.find(
        (mp) => mp.countryName === country.name
      );
    }

    const aggressivenessToBeAdded =
      AggressivenessHelper.calculateAggressiveness({
        calcType: CaculateAggressivenessCalcType.DECLARE_WAR,
        country: attacker,
        target,
      });

    return ResponseHelper.success({
      data: {
        simulation: {
          totals,
          participants,
          aggressivenessToBeAdded,
        },
      },
    });
  }

  static async demandProvince(data: DemandProvinceParam) {
    const country = await countryRepository().findOne(data.countryId);
    const game = await gameRepository().findOne(data.gameId, {
      select: ['id', 'tradingProvinces'],
    });

    if (!country) {
      return ResponseHelper.error({
        message: 'Country not found',
      });
    }

    const decision = country.decisions.find(
      (decision) =>
        decision.actionType === ActionType.DEMAND &&
        decision.data.provincesToFill.includes(data.mapRef)
    );

    if (!decision) {
      return ResponseHelper.error({
        message: 'You cannot demand this province',
      });
    }

    if (decision.data.maxProvincesAllowedToDemand <= 0) {
      return ResponseHelper.error({
        message: 'Max demands reached',
      });
    }

    const target = await countryRepository().findOne(data.targetCountryId);

    if (!target) {
      return ResponseHelper.error({
        message: 'Target Country not found',
      });
    }

    const provinceIndex = target.provinces.findIndex(
      (province) => province.mapRef === data.mapRef
    );

    if (provinceIndex === -1) {
      return ResponseHelper.error({
        message: `Province ${data.mapRef} not found`,
        data: {
          mapRef: data.mapRef,
        },
      });
    }

    const provinceDecisionIndex = decision.data.provincesToFill.indexOf(
      data.mapRef
    );

    decision.data.provincesToFill.splice(provinceDecisionIndex, 1);

    const province: Province = { ...target.provinces[provinceIndex] };
    province.passives.push({
      type: ProvincePassiveType.REDUCE_INCOMING,
      value: 90,
      valueType: CountryPassiveValueType.PERCENT,
      description: `Incoming reduced by 90% due to recent wars`,
      duration: +process.env.PROVINCE_INCOMING_REDUCTION_BY_WARS_DURATION,
    });

    let aggressiveness: number =
      AggressivenessHelper.calculateAggressivenessTakeProvince({
        country,
        target,
        isCapital: province.isCapital,
      });

    country.addAggressiveness(aggressiveness);

    province.isCapital = false;
    target.provinces.splice(provinceIndex, 1);
    country.provinces.push(province);

    const provincesToFill = [
      ...target.provinces.map((province) => province.mapRef),
    ];

    decision.data.provincesToFill = provincesToFill;
    decision.decided = true;

    const tradingProvinceIndex = game.tradingProvinces.findIndex(
      (tradingProvinces) => tradingProvinces.provinceMapRef === province.mapRef
    );

    const countriesToSave = [country, target];

    if (tradingProvinceIndex !== -1) {
      const tradingProvince = game.tradingProvinces[tradingProvinceIndex];
      let countryWithDecision: Country;

      if (tradingProvince.buyer.id === target.id) {
        countryWithDecision = target;
      } else {
        countryWithDecision = await countryRepository().findOne(
          tradingProvince.buyer.id
        );

        countriesToSave.push(countryWithDecision);
      }

      countryWithDecision.decisions = countryWithDecision.decisions.filter(
        (decision) => decision.id !== tradingProvince.decisionId
      );

      game.tradingProvinces.splice(tradingProvinceIndex, 1);
      await gameRepository().save(game);
    }

    decision.data.maxProvincesAllowedToDemand--;
    country.doNotcallChangeFunctionOnSave = true;
    target.doNotcallChangeFunctionOnSave = true;

    await countryRepository().save(countriesToSave);

    const payload = {
      color: country.color,
      provinceToFill: province.mapRef,
      remainingProvinces: provincesToFill,
      maxProvincesAllowedToDemand: decision.data.maxProvincesAllowedToDemand,
      decisions: country.decisions,
      message: `${country.name} claimed ${province.name} from ${target.name}`,
      country: {
        ...country.getCountrySimplifiedData(),
        isAi: country.isAi,
        owner: country.owner,
        aggressiveness: country.aggressiveness,
      },
    };

    return ResponseHelper.success({
      message: 'Province taken successfully',
      data: payload,
    });
  }
}

type GetProvinceParam = {
  gameId: string;
  playerId?: string;
  provinceMapRef: string;
};

type GetCountriesSortedByRankingParam = {
  gameId: string;
  game?: Game;
  rankingType: RankingType;
  playerId?: string;
  countryId?: string;
  country?: Country;
};

type GetCountryParam = {
  gameId: string;
  countryId: string;
  playerId?: string;
};

type GetCountriesParam = {
  gameId: string;
  countries: string[];
  playerId?: string;
};

type GetWarSimulationParam = {
  gameId: string;
  game?: Game;
  playerId?: string;
  attacker: string;
  target: string;
  include?: string[];
  exclude?: string[];
  removeProvinces?: boolean;
};

type DemandProvinceParam = {
  gameId: string;
  countryId: string;
  targetCountryId: string;
  mapRef: string;
};
