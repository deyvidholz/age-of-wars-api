import { Request, Response } from 'express';
import { HttpResponseHelper } from '../../helpers/http-response.helper';
import { ShopService } from './shop.service';

export class ShopController {
  static async buy(req: Request, res: Response) {
    const serviceData = await ShopService.buy({
      ...req.body,
      playerId: req.user.id,
      countryId: req.headers['country-id'],
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

  static async getOrderPrice(req: Request, res: Response) {
    const serviceData = await ShopService.getOrderPrice({
      ...req.body,
      playerId: req.user.id,
      countryId: req.headers['country-id'],
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

  static async getProvincesImprovementPrice(req: Request, res: Response) {
    const serviceData = await ShopService.getProvincesImprovementPrice({
      ...req.body,
      playerId: req.user.id,
      countryId: req.headers['country-id'],
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
