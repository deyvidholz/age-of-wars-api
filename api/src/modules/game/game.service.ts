import { countriesWorldAOWV1 } from '../../data/v1/countries.data';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { V1CountryHelper } from '../../helpers/v1-countries.helper';
import { ActionService } from '../action/action.service';
import { Action } from '../action/action.typing';
import { Country } from '../country/country.entity';
import { countryRepository } from '../country/country.repository';
import { Player } from '../player/player.entity';
import { playerRepository } from '../player/player.repository';
import { gameOptions } from './game.defaults';
import { gameRepository } from './game.repository';
import { GameOptions, GameStage } from './game.typing';

export class GameService {
  static async create(
    data: CreateParam
  ): Promise<SuccessResponse | ErrorResponse> {
    data.game.options = {
      ...gameOptions,
      ...data.game.options,
    };

    const owner = await playerRepository().findOne(data.playerId);

    if (!owner) {
      return ResponseHelper.error({
        message: 'Player not found',
      });
    }

    if (!data.game.name) {
      return ResponseHelper.error({
        message: 'One or more required fields was not sent',
        data: ['name'],
      });
    }

    if (!data.game.name.match(/^[\w ]{4,24}$/)) {
      return ResponseHelper.error({
        message: 'Invalid game name',
        data: ['name'],
      });
    }

    // Get countries
    const countriesPrepared =
      V1CountryHelper.getPreparedCountries(countriesWorldAOWV1);

    const game = gameRepository().create({
      owner,
      countries: countriesPrepared,
      ...data.game,
    });

    await gameRepository().save(game);

    // Setting countries ids (allies, enemies, etc)
    for (const country of game.countries) {
      country.allies.map((target) => {
        target.id = game.countries.find(
          (country) => country.name === target.name
        ).id;

        return target;
      });

      country.enemies.map((target) => {
        target.id = game.countries.find(
          (country) => country.name === target.name
        ).id;

        return target;
      });

      country.inWarWith.map((target) => {
        target.id = game.countries.find(
          (country) => country.name === target.name
        ).id;

        return target;
      });

      country.guaranteeingIndependence.map((target) => {
        target.id = game.countries.find(
          (country) => country.name === target.name
        ).id;

        return target;
      });

      country.independenceGuaranteedBy.map((target) => {
        target.id = game.countries.find(
          (country) => country.name === target.name
        ).id;

        return target;
      });
    }

    await gameRepository().save(game);

    return ResponseHelper.success({
      message: 'Game created successfully',
      data: { game },
    });
  }

  static async find(data: FindParam) {
    const game = await gameRepository().findOne({
      id: data.gameId,
    });

    if (!game) {
      return ResponseHelper.error({
        message: `Game not found`,
        data,
      });
    }

    return ResponseHelper.success({
      data: { game },
    });
  }

  // TODO test when some country has a player as owner
  static async delete(data: DeleteParam) {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
        owner: { id: data.playerId },
      },
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: {
          gameId: data.gameId,
        },
      });
    }

    await countryRepository().delete({
      game: { id: game.id },
    });
    await gameRepository().remove(game);

    return ResponseHelper.success({
      message: 'Game deleted successfully',
    });
  }

  static async getGames(data: GetGamesParam) {
    const games = await gameRepository().find({
      where: { owner: { id: data.playerId } },
    });

    return ResponseHelper.success({
      data: { games },
    });
  }

  static async startGame(data: StartGameParam) {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
        owner: { id: data.playerId },
      },
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: {
          gameId: data.gameId,
        },
      });
    }

    // Reseting players data
    for (const player of game.players) {
      if (player.currentGameId === game.id) {
        player.alreadyPlayed = false;
        player.currentGameId = null;
        player.currentGameCountryFlag = null;
      }

      player.countries = player.countries?.filter(
        (country: Country) => country.game.id !== game.id
      );
    }

    const ownerCountry = game.owner.countries?.find(
      (country: Country) => country.game.id === game.id
    );

    if (ownerCountry) {
      ownerCountry.isAi = true;
      ownerCountry.owner = null;
    }

    game.owner.alreadyPlayed = false;
    game.owner.currentGameId = game.id;
    game.stage = GameStage.IN_LOBBY;
    game.countries = game.countries.map((country: Country) => {
      country.isAi = true;
      country.owner = null;

      return country;
    });

    game.players = [];
    await playerRepository().save([...game.players, game.owner]);
    await gameRepository().save(game);

    return ResponseHelper.success({
      message: 'Game started',
      data: { game },
    });
  }

  static async startPickingPhase(
    data: StartPickingPhaseParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
        owner: { id: data.playerId },
      },
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: {
          gameId: data.gameId,
        },
      });
    }

    game.stage = GameStage.PICKING_PHASE;
    game.owner.alreadyPlayed = false;

    game.countries = game.countries.map((country: Country) => {
      country.isAi = true;
      country.owner = null;
      return country;
    });

    await gameRepository().save(game);

    return ResponseHelper.success({
      message: 'Started picking phase successfully',
      data: { game },
    });
  }

  static async forceNextTurn(
    data: ForceNextTurnParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
        owner: { id: data.playerId },
      },
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: {
          gameId: data.gameId,
        },
      });
    }

    await game.setNextTurn(true);
    await gameRepository().save(game);

    return ResponseHelper.success({
      message: `Game is now on stage ${game.stageCount}`,
      data: { game },
    });
  }

  // TODO test
  static async kickPlayer(
    data: KickPlayerParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
        owner: { id: data.playerId },
      },
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: {
          gameId: data.gameId,
        },
      });
    }

    if (data.targetPlayerId === game.owner.id) {
      return ResponseHelper.error({
        message: 'You cannot kick the owner',
      });
    }

    const player = game.players.find(
      (player: Player) => player.id === data.targetPlayerId
    );

    if (!player) {
      return ResponseHelper.error({
        message: 'Player not found',
      });
    }

    const country: Country = game.countries.find(
      (country: Country) => country.game.id === game.id
    );

    player.currentGameId =
      player.currentGameId === game.id ? null : player.currentGameId;
    player.countries = player.countries.filter(
      (country: Country) => country.game.id !== game.id
    );
    country.isAi = true;
    country.owner = null;

    game.players = game.players.filter(
      (player: Player) => player.id !== data.targetPlayerId
    );

    await playerRepository().save(player);
    await gameRepository().save(game);

    return ResponseHelper.success({
      message: `Player ${player.nickname} kicked from ${game.name}`,
      data: game,
    });
  }

  static async nextTurn(data: NextTurnParam) {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
      },
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: {
          gameId: data.gameId,
        },
      });
    }

    const player =
      game.owner.id === data.playerId
        ? game.owner
        : game.players.find((p) => p.id === data.playerId);

    const playerIsParticipating = player && player.currentGameId === game.id;

    if (!playerIsParticipating) {
      return ResponseHelper.error({
        message:
          'You cannot go to the next turn in a game that you are not playing',
      });
    }

    if (player.alreadyPlayed) {
      return ResponseHelper.error({
        message: 'Wait until the next turn',
      });
    }

    let country: Country;

    if (data.countryId) {
      country = game.countries.find((c) => c.id === data.countryId);

      if (!country) {
        return ResponseHelper.error({
          message: 'Country not found',
        });
      }

      country.actions =
        data.actions?.map((action) => ({
          ...action,
          playerId: player.id,
          countryId: country.id,
          gameId: game.id,
        })) || [];
    }

    player.alreadyPlayed = true;
    const isNextTurn = await game.setNextTurn();

    if (isNextTurn) {
      game.owner.alreadyPlayed = false;

      game.players = game.players.map((player) => {
        player.alreadyPlayed = false;
        return player;
      });

      // await ActionService.runActions({
      //   game,
      // });

      await playerRepository().save([...game.players, game.owner]);
      await gameRepository().save(game);
    } else {
      await playerRepository().save(player);

      if (country) {
        await countryRepository().save(country);
      }
    }

    return ResponseHelper.success({
      message: `Player ${player.nickname} called next turn`,
      data: { game, isNextTurn },
    });
  }

  static async leaveGame(
    data: LeaveGameParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const game = await gameRepository().findOne({
      where: {
        id: data.gameId,
      },
    });

    if (!game) {
      return ResponseHelper.error({
        message: 'Game not found',
        data: {
          gameId: data.gameId,
        },
      });
    }

    game.players = game.players.filter((player) => player.id !== data.playerId);
    await gameRepository().save(game);

    return ResponseHelper.success({
      data: { game },
    });
  }
}

type CreateParam = {
  playerId: string;
  game: {
    name: string;
    password?: string;
    options?: GameOptions;
  };
};

type FindParam = {
  playerId: string;
  gameId: string;
};

type DeleteParam = {
  playerId: string;
  gameId: string;
};

type GetGamesParam = {
  playerId: string;
};

type StartGameParam = {
  playerId: string;
  gameId: string;
};

type StartPickingPhaseParam = {
  playerId: string;
  gameId: string;
};

type ForceNextTurnParam = {
  playerId: string;
  gameId: string;
};

type KickPlayerParam = {
  playerId: string;
  gameId: string;
  targetPlayerId: string;
};

type NextTurnParam = {
  playerId: string;
  countryId: string;
  gameId: string;
  actions: Action[];
};

type LeaveGameParam = {
  playerId: string;
  gameId: string;
};
