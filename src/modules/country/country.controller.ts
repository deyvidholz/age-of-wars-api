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

  static async getV1AvailabeCountries(req: Request, res: Response) {
    const serviceData = await CountryService.getV1AvailabeCountries();

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

  static async getAvailableFocuses(req: Request, res: Response) {
    const serviceData = await CountryService.getAvailableFocuses();

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

  static async getAvailablePersonalities(req: Request, res: Response) {
    const serviceData = await CountryService.getAvailablePersonalities();

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

  static async getCountry(req: Request, res: Response) {
    const serviceData = await CountryService.getCountry({
      playerId: req.user.id,
      gameId: req.headers['game-id'] as string,
      countryId: req.params.countryId,
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

  static async getWarSimulation(req: Request, res: Response) {
    const serviceData = await CountryService.getWarSimulation({
      ...req.body,
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

  static async getCountries(req: Request, res: Response) {
    const serviceData = await CountryService.getCountries({
      ...req.body,
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
}
