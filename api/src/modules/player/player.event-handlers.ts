import { Server, Socket } from 'socket.io';
import { GeneralHelper } from '../../helpers/general.helper';
import { SocketResponse } from '../../helpers/socket-response.helper';
import { SerializationHelper } from '../../helpers/serialization.helper';
import { Action } from '../action/action.typing';
import { GameService } from '../game/game.service';
import { PlayerService } from './player.service';

const playerEventHandlers = (io: Server, socket: Socket) => {
  const startPickingPhase = async (payload: StartPickingPhasePayload) => {
    const player = GeneralHelper.jwtDecode(payload.token);

    if (!player) {
      return SocketResponse.error({
        socket,
        message: 'Unauthorized',
      });
    }

    const serviceData = await GameService.startPickingPhase({
      gameId: payload.gameId,
      playerId: player.id,
    });

    if (serviceData.error) {
      return SocketResponse.error({
        ...serviceData,
        socket,
      });
    }

    // BUGFIX: Serialize data to prevent circular reference errors
    const serializedData = SerializationHelper.serializeGameData(serviceData.data);

    socket.emit('player:start-picking-phase', serializedData);

    socket
      .to(payload.gameId)
      .emit('player:start-picking-phase', serializedData);
  };

  const joinGame = async (payload: JoinGamePayload) => {
    const player = GeneralHelper.jwtDecode(payload.token);

    if (!player) {
      return SocketResponse.error({
        socket,
        message: 'Unauthorized',
      });
    }

    const serviceData = await PlayerService.joinGame({
      gameId: payload.gameId,
      playerId: player.id,
      password: payload.password,
    });

    if (serviceData.error) {
      return SocketResponse.error({
        ...serviceData,
        socket,
      });
    }

    // BUGFIX: Serialize data to prevent circular reference errors
    const serializedData = SerializationHelper.serializeGameData(serviceData.data);

    socket.emit('player:join-game', serializedData);
    socket.to(payload.gameId).emit('player:join-game', serializedData);
  };

  const pickCountry = async (payload: PickCountryPayload) => {
    const player = GeneralHelper.jwtDecode(payload.token);

    if (!player) {
      return SocketResponse.error({
        socket,
        message: 'Unauthorized',
      });
    }

    const serviceData = await PlayerService.pickCountry({
      gameId: payload.gameId,
      playerId: player.id,
      countryId: payload.countryId,
      targetId: payload.targetId,
    });

    if (serviceData.error) {
      return SocketResponse.error({
        ...serviceData,
        socket,
      });
    }

    // BUGFIX: Serialize data to prevent circular reference errors
    const serializedData = SerializationHelper.serializeGameData(serviceData.data);

    socket.emit('player:pick-country', serializedData);
    socket.to(payload.gameId).emit('player:pick-country', serializedData);
  };

  const nextTurn = async (payload: NextTurnPayload) => {
    const player = GeneralHelper.jwtDecode(payload.token);

    if (!player) {
      return SocketResponse.error({
        socket,
        message: 'Unauthorized',
      });
    }

    const serviceData = await GameService.nextTurn({
      playerId: player.id,
      gameId: payload.gameId,
      countryId: payload.countryId,
      actions: payload.actions,
    });

    if (serviceData.error) {
      return SocketResponse.error({
        ...serviceData,
        socket,
      });
    }

    // BUGFIX: Serialize data to prevent circular reference errors
    const serializedData = SerializationHelper.serializeGameData(serviceData.data);

    socket.emit('player:next-turn', serializedData);

    if (serviceData.data.isNextTurn) {
      socket.to(payload.gameId).emit('player:next-turn', serializedData);
    } else {
      socket.to(payload.gameId).emit('player:player-list', {
        owner: serializedData.game.owner,
        players: [...serializedData.game.players],
      });
    }
  };

  socket.on('player:start-picking-phase', startPickingPhase);
  socket.on('player:join-game', joinGame);
  socket.on('player:pick-country', pickCountry);
  socket.on('player:next-turn', nextTurn);
};

type StartPickingPhasePayload = {
  token: string;
  gameId: string;
  playerId: string;
};

type JoinGamePayload = {
  token: string;
  gameId: string;
  playerId: string;
  password?: string;
};

type PickCountryPayload = {
  token: string;
  gameId: string;
  playerId: string;
  countryId: string;
  targetId: string;
};

type NextTurnPayload = {
  token: string;
  gameId: string;
  countryId: string;
  actions: Action[];
};

export default playerEventHandlers;
