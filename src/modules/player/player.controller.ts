import { Request, Response } from 'express';
import { HttpResponseHelper } from '../../helpers/http-response.helper';
import { PlayerService } from './player.service';

export class PlayerController {
  static async auth(req: Request, res: Response) {
    const serviceData = await PlayerService.auth({
      uncryptedPassword: req.body.password,
      username: req.body.username,
    });

    if (serviceData.error) {
      return HttpResponseHelper.unauthorized({
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

  static async create(req: Request, res: Response) {
    const serviceData = await PlayerService.create({
      ...req.body,
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

  static async update(req: Request, res: Response) {
    const serviceData = await PlayerService.update({
      ...req.body,
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

  static async joinGame(req: Request, res: Response) {
    const serviceData = await PlayerService.joinGame({
      ...req.body,
      playerId: req.user.id,
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

  static async pickCountry(req: Request, res: Response) {
    const serviceData = await PlayerService.pickCountry({
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
