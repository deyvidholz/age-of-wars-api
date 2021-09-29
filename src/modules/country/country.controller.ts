import { Request, Response } from 'express';
import { countriesWorldAOWV1 } from '../../data/v1/countries.data';
import { HttpResponseHelper } from '../../helpers/http-response.helper';
import { CountryService } from './country.service';
import { RankingType } from './country.typing';

export class CountryController {
  static async getProvince(req: Request, res: Response) {
    const serviceData = await CountryService.getProvince({
      provinceMapRef: req.params.mapRef,
      playerId: req.user.id,
      gameId: req.headers['game-id'] as string,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    return HttpResponseHelper.success({
      res,
      message: serviceData.message,
      data: serviceData.data,
    });
  }

  static async getCountriesSortedByRanking(req: Request, res: Response) {
    const serviceData = await CountryService.getCountriesSortedByRanking({
      playerId: req.user.id,
      gameId: req.headers['game-id'] as string,
      countryId: req.params.countryId,
      rankingType:
        RankingType[req.params.rankingType?.toUpperCase()] ||
        RankingType.INCOMING_BALANCE,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    return HttpResponseHelper.success({
      res,
      message: serviceData.message,
      data: serviceData.data,
    });
  }

  static getV1AvailabeCountries(req: Request, res: Response) {
    const countries = countriesWorldAOWV1.map((country) => country.name);
    countries.sort((a: any, b: any) => b.name - a.name);

    return HttpResponseHelper.success({
      res,
      data: {
        countries,
      },
    });
  }
}
