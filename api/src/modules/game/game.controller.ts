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

  static async find(req: Request, res: Response) {
    const serviceData = await GameService.find({
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
      serviceData.data.games = serviceData.data.games.map((game) => game.id);
    } else if (req.query['simplified'] !== undefined) {
      serviceData.data.games = (serviceData.data.games as Game[]).map(
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
              currentGameCountryFlag: game.owner.currentGameCountryFlag,
            },
            players: game.players.map((player) => ({
              id: player.id,
              nickname: player.nickname,
              currentGameCountryFlag: player.currentGameCountryFlag,
            })),
            countries: game.countries.map((country) => country.name),
            wars: game.wars,
          } as unknown as Game)
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

  static async startPickingPhase(req: Request, res: Response) {
    const serviceData = await GameService.startPickingPhase({
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

  static async nextTurn(req: Request, res: Response) {
    const serviceData = await GameService.nextTurn({
      ...req.body,
      playerId: req.user.id,
      gameId: req.headers['game-id'] as string,
      countryId: req.headers['country-id'] as string,
    });

    if (serviceData.error) {
      return HttpResponseHelper.badRequest({
        res,
        message: serviceData.message,
        data: serviceData.data,
      });
    }

    if (req.query.exclude && typeof req.query.exclude === 'object') {
      const attributesToExclude = req.query.exclude as string[];

      for (const attribute of attributesToExclude) {
        delete serviceData.data[attribute];
      }
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
