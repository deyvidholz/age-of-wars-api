import { Request, Response } from 'express';
import { HttpResponseHelper } from '../../helpers/http-response.helper';
import { CountryService } from './country.service';

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
}
