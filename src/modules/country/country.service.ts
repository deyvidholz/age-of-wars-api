import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { gameRepository } from '../game/game.repository';
import { Opinion, Province, RankingType } from './country.typing';

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
          (a: any, b: any) => b.incoming.balance - a.incoming.balance
        );
        break;

      case RankingType.INCOMING_OIL:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          incoming: country.incoming,
        }));

        countries.sort((a: any, b: any) => b.incoming.oil - a.incoming.oil);
        break;

      case RankingType.MILITARY_POWER:
        countries = countries.map((country) => ({
          id: country.id,
          flag: country.flag,
          name: country.name,
          militaryPower: country.militaryPower,
        }));

        countries.sort(
          (a: any, b: any) => b.militaryPower.total - a.militaryPower.total
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
            b.militaryPower.aircrafts - a.militaryPower.aircrafts
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
            b.militaryPower.divisions - a.militaryPower.divisions
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
          (a: any, b: any) => b.militaryPower.tanks - a.militaryPower.tanks
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
            b.militaryPower.warships - a.militaryPower.warships
        );
        break;

      case RankingType.OPINION:
        if (!data.countryId) {
          return ResponseHelper.error({
            message: 'Invalid country ID',
            data,
          });
        }

        const country = game.countries.find(
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

        opinions.sort((a: any, b: any) => b.opinionValue - a.opinionValue);

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
            b.aggressiveness.current - a.aggressiveness.current
        );
        break;
    }

    return ResponseHelper.success({
      data: { countries },
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
  rankingType: RankingType;
  playerId?: string;
  countryId?: string;
};
