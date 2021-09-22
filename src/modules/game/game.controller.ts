import { Request, Response } from 'express';
import { HttpResponseHelper } from '../../helpers/http-response.helper';
import { Game } from './game.entity';
import { GameService } from './game.service';

export class GameController {
  static async create(req: Request, res: Response) {
    const serviceData = await GameService.create({
      playerId: req.user.id,
      game: {
        ...req.body,
      },
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

  static async delete(req: Request, res: Response) {
    const serviceData = await GameService.delete({
      playerId: req.user.id,
      gameId: req.params.gameId,
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

  static async getGames(req: Request, res: Response) {
    const serviceData = await GameService.getGames({
      playerId: req.user.id,
    });

    if (req.query['only-id'] !== undefined) {
      serviceData.data = serviceData.data.map((game) => game.id);
    } else if (req.query['simplified'] !== undefined) {
      serviceData.data = (serviceData.data as Game[]).map(
        (game) =>
          ({
            id: game.id,
            stage: game.stage,
            stageCount: game.stageCount,
            name: game.name,
            options: game.options,
            owner: {
              id: game.owner.id,
              nickname: game.owner.nickname,
            },
            players: game.players.map((player) => ({
              id: player.id,
              nickname: player.nickname,
            })),
            countries: game.countries.map((country) => country.name),
            wars: game.wars,
          } as Game)
      );
    }

    return HttpResponseHelper.success({
      res,
      data: serviceData.data,
    });
  }

  static async startGame(req: Request, res: Response) {
    const serviceData = await GameService.startGame({
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

  static async startPickingPhase(req: Request, res: Response) {
    const serviceData = await GameService.startPickingPhase({
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

  static async nextTurn(req: Request, res: Response) {
    const serviceData = await GameService.nextTurn({
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

  static async forceNextTurn(req: Request, res: Response) {
    const serviceData = await GameService.forceNextTurn({
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

  static async kickPlayer(req: Request, res: Response) {
    const serviceData = await GameService.kickPlayer({
      playerId: req.user.id,
      targetPlayerId: req.body.playerId,
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
