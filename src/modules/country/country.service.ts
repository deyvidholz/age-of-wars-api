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

    const allProvinces: any[] = [];

    for (const country of game.countries) {
      const isOwner = !country.isAi && country.owner?.id === data.playerId;
      const ownerCountry = { ...country, provinces: [] };

      allProvinces.push(
        ...country.provinces.map((province) => {
          return {
            ...province,
            isOwner,
            country: ownerCountry,
          };
        })
      );
    }

    const province = allProvinces.find(
      (province) =>
        province?.mapRef?.toLowerCase() === data.provinceMapRef?.toLowerCase()
    );

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

    switch (rankingType) {
      case RankingType.INCOMING_BALANCE:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          incoming: country.incoming,
        }));

        countries.sort(
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
        }));

        countries.sort(
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
        }));

        countries.sort(
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
        }));

        countries.sort(
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
        }));

        countries.sort(
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
        }));

        countries.sort(
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
        }));

        countries.sort(
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

  // TODO improve performance (reduce maps)
  static async getWarSimulation(data: GetWarSimulationParam) {
    const game = data.game || (await gameRepository().findOne(data.gameId));

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: { gameId: data.gameId },
      });
    }

    // Removing provinces to reduce payload size
    if (data.removeProvinces) {
      game.countries = game.countries.map((country) => {
        country.provinces = [];
        return country;
      });
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

    if (data.exclude) {
      attackerAlliesNames = attackerAlliesNames.filter(
        (countryName) => !data.exclude.includes(countryName)
      );
    }

    if (data.include) {
      attackerAlliesNames = attackerAlliesNames.filter((countryName) =>
        data.include.includes(countryName)
      );
    }

    let participants: { attackers: Country[]; victims: Country[] } = {
      attackers: [],
      victims: [],
    };

    const attackerAllies = game.countries.filter((country) =>
      attackerAlliesNames.includes(country.name)
    );

    const targetAllies = game.countries.filter((country) =>
      targetAlliesNames.includes(country.name)
    );

    participants.attackers.push(...attackerAllies);
    participants.victims.push(...targetAllies);

    const totals = CountryHelper.sumWarMilitaryPowers({
      attackers: [attacker, ...attackerAllies],
      victims: [target, ...targetAllies],
    });

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
    // decision.decided = true;

    await countryRepository().save([country, target]);

    const payload = {
      color: country.color,
      provinceToFill: province.mapRef,
      remainingProvinces: provincesToFill,
      decisions: country.decisions,
      message: `${country.name} claimed ${province.name} from ${target.name}`,
      country: {
        ...country.getCountrySimplifiedData(),
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
  countryId: string;
  targetCountryId: string;
  mapRef: string;
};
