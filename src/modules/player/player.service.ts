import 'dotenv/config';
import jwt from 'jsonwebtoken';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { Country } from '../country/country.entity';
import { gameRepository } from '../game/game.repository';
import { GameStage } from '../game/game.typing';
import { Player } from './player.entity';
import { checkPassword, encryptPassword } from './player.helper';
import { playerRepository } from './player.repository';

export class PlayerService {
  static async auth(data: AuthParam): Promise<SuccessResponse | ErrorResponse> {
    if (!data.username || !data.uncryptedPassword) {
      return ResponseHelper.error({
        message: 'One or more required fields was not sent',
        data: ['username', 'uncryptedPassword'],
      });
    }

    let player = await playerRepository().findOne({
      select: [
        'id',
        'username',
        'nickname',
        'password',
        'currentGameId',
        'alreadyPlayed',
        'games',
        'countries',
      ],
      where: { username: data.username },
      relations: [],
    });

    if (!player) {
      return ResponseHelper.error({
        message: 'Player not found',
      });
    }

    const invalidPassword = checkPassword(
      data.uncryptedPassword,
      player.password
    );

    if (!invalidPassword) {
      return ResponseHelper.error({
        message: 'Unauthorized',
      });
    }

    const payload = {
      id: player.id,
      username: player.username,
      nickname: player.nickname,
      currentGameId: player.currentGameId,
      alreadyPlayed: player.alreadyPlayed,
      games: player.games?.map((g) => g.id) || [],
      countries: player.countries?.map((g) => g.id) || [],
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: +process.env.JWT_EXPIRATION,
    });

    const decoded = jwt.decode(token) as jwt.JwtPayload;

    return ResponseHelper.success({
      message: 'Successfully authenticated',
      data: {
        playerId: player.id,
        playerNickname: player.nickname,
        jwt: {
          token,
          expiration: decoded.exp,
        },
      },
    });
  }

  static async create(
    data: CreateParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const player = playerRepository().create(data);

    if (!player.password) {
      return ResponseHelper.error({
        message: 'One or more required fields was not sent',
        data: ['password'],
      });
    }

    try {
      await playerRepository().save(player);
    } catch (err) {
      if (err.code === '23505') {
        return ResponseHelper.error({
          message: 'Username already taken',
        });
      }

      return ResponseHelper.error({
        message: 'Something went wrong',
      });
    }

    return ResponseHelper.success({
      message: 'Player created successfuly',
    });
  }

  static async update(
    data: UpdateParam
  ): Promise<SuccessResponse | ErrorResponse> {
    let player = await playerRepository().findOne({
      select: [
        'id',
        'username',
        'nickname',
        'password',
        'currentGameId',
        'alreadyPlayed',
        'games',
        'countries',
      ],
      where: { id: data.id },
      relations: [],
    });

    if (!player) {
      return ResponseHelper.error({
        message: 'Player not found',
      });
    }

    if (!data.currentPassword) {
      return ResponseHelper.error({
        message: 'One or more required fields was not sent',
        data: ['currentPassword'],
      });
    }

    const isInvalidPassword = checkPassword(
      data.currentPassword,
      player.password
    );

    if (!isInvalidPassword) {
      return ResponseHelper.error({
        message: 'Unauthorized',
      });
    }

    player.nickname = data.nickname || player.nickname;

    if (data.password) {
      player.password = encryptPassword(data.password);
    }

    try {
      await playerRepository().save(player);
    } catch (err) {
      return ResponseHelper.error({
        message: 'Something went wrong',
      });
    }

    return ResponseHelper.success({
      message: 'Player update successfuly',
    });
  }

  static async joinGame(
    data: JoinGameParam
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

    if (game.password && game.password !== data.password) {
      return ResponseHelper.error({
        message: 'Wrong password',
      });
    }

    const player = await playerRepository().findOne(data.playerId);

    if (!player) {
      return ResponseHelper.error({
        message: 'Player not found',
      });
    }

    if (player.id === game.owner.id) {
      player.currentGameId = game.id;
      await playerRepository().save(player);

      return ResponseHelper.success({
        message: `Player ${player.nickname} joined the game`,
        data: { game },
      });
    }

    if (game.stage !== GameStage.IN_LOBBY) {
      return ResponseHelper.error({
        message: 'This game is closed or already running',
      });
    }

    player.alreadyPlayed = false;
    player.currentGameId = game.id;
    game.players.push(player);

    await playerRepository().save(player);
    await gameRepository().save(game);

    return ResponseHelper.success({
      message: `Player ${player.nickname} joined the game`,
      data: { game },
    });
  }

  // TODO test
  static async pickCountry(
    data: PickCountryParam
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

    if (game.stage !== GameStage.PICKING_PHASE) {
      return ResponseHelper.error({
        message: 'Game stage is not in picking phase',
        data: {
          gameId: data.gameId,
          gameStage: game.stage,
        },
      });
    }

    let player =
      game.owner.id === data.playerId
        ? game.owner
        : game.players.find(
            (player: Player) =>
              player.currentGameId === game.id && player.id === data.playerId
          );

    if (!player) {
      return ResponseHelper.error({
        message: 'Player is not playing this game',
      });
    }

    if (player.currentGameId !== game.id) {
      return ResponseHelper.error({
        message: 'You cannot pick countries in games that you are not playing',
      });
    }

    const currentCountry = game.countries.find(
      (country) => !country.isAi && country.owner.id === player.id
    );

    if (currentCountry) {
      return ResponseHelper.error({
        message: `You already picked a country (${currentCountry.name})`,
      });
    }

    const country: Country = game.countries.find(
      (country: Country) => country.isAi && country.id === data.countryId
    );

    if (!country) {
      return ResponseHelper.error({
        message: 'Country not found or already taken',
        data: {
          countryId: data.countryId,
        },
      });
    }

    if (game.options.blacklistedCountries.includes(country.name)) {
      return ResponseHelper.error({
        message: 'This country is not allowed to pick',
        data: {
          blacklistedCountries: game.options.blacklistedCountries,
        },
      });
    }

    player.alreadyPlayed = true;
    country.isAi = false;
    country.owner = player;

    const totalPlayers = game.players.length + 1;

    const availableCountries = [
      ...game.countries.filter((country) => country.isAi),
    ];

    if (game.options.maxPlayers === -1) {
      if (totalPlayers >= availableCountries.length) {
        return ResponseHelper.error({
          message: 'Players limit reached',
        });
      }
    } else if (totalPlayers >= game.options.maxPlayers) {
      return ResponseHelper.error({
        message: 'Players limit reached',
      });
    }

    const countryWithoutProvinces = { ...country, provinces: [] };

    const isNextTurn = await game.setNextTurn();

    if (isNextTurn) {
      game.owner.alreadyPlayed = false;

      game.players = game.players.map((player) => {
        player.alreadyPlayed = false;
        return player;
      });
      await playerRepository().save([...game.players, game.owner]);
    } else {
      await playerRepository().save(player);
    }

    await gameRepository().save(game);

    const availableColors = availableCountries.map((country) => country.color);

    return ResponseHelper.success({
      message: `Player ${player.nickname} picked ${country.name}`,
      data: {
        country: countryWithoutProvinces,
        game,
        availableCountries,
        availableColors,
      },
    });
  }
}

type AuthParam = {
  username: string;
  uncryptedPassword: string;
};

type CreateParam = {
  username: string;
  nickname: string;
  password: string;
};

type UpdateParam = {
  id: string;
  nickname: string;
  password: string;
  currentPassword: string;
};

type JoinGameParam = {
  playerId: string;
  gameId: string;
  password?: string;
};

type PickCountryParam = {
  countryId: string;
  gameId: string;
  playerId: string;
};
