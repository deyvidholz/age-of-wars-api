import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { gameRepository } from '../game/game.repository';
import { Province } from './country.typing';

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
}

type GetProvinceParam = {
  gameId: string;
  playerId?: string;
  provinceMapRef: string;
};
