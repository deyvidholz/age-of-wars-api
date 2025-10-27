import { Request, Response } from 'express';
import { HttpResponseHelper } from '../../helpers/http-response.helper';
import { ConsoleService } from './console.service';

export class ConsoleController {
  static async executeCommand(req: Request, res: Response) {
    const serviceData = await ConsoleService.executeCommand({
      gameId: req.body.gameId,
      playerId: req.user.id,
      command: req.body.command,
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
