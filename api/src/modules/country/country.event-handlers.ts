import 'dotenv/config';
import { Server, Socket } from 'socket.io';
import { GeneralHelper } from '../../helpers/general.helper';
import { SocketResponse } from '../../helpers/socket-response.helper';
import { SerializationHelper } from '../../helpers/serialization.helper';
import { CountryService } from './country.service';

const countryEventHandlers = (io: Server, socket: Socket) => {
  const getProvince = async (payload: GetProvincePayload) => {
    const player = GeneralHelper.jwtDecode(payload.token);

    if (!player) {
      return SocketResponse.error({
        socket,
        message: 'Unauthorized',
      });
    }

    const serviceData = await CountryService.getProvince({
      gameId: payload.gameId,
      provinceMapRef: payload.mapRef,
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
    socket.emit('country:get@province', serializedData);
  };

  const demandProvince = async (payload: DemandProvincePayload) => {
    const player = GeneralHelper.jwtDecode(payload.token);

    if (!player) {
      return SocketResponse.error({
        socket,
        message: 'Unauthorized',
      });
    }

    const serviceData = await CountryService.demandProvince({
      mapRef: payload.mapRef,
      countryId: payload.countryId,
      gameId: payload.gameId,
      targetCountryId: payload.targetCountryId,
    });

    if (serviceData.error) {
      return SocketResponse.error({
        ...serviceData,
        socket,
      });
    }

    // BUGFIX: Serialize data to prevent circular reference errors
    const serializedData = SerializationHelper.serializeGameData(serviceData.data);
    socket.emit('country:demand-province', serializedData);
    socket.to(payload.gameId).emit('country:demand-province', serializedData);
  };

  socket.on('country:get@province', getProvince);
  socket.on('country:demand-province', demandProvince);
};

export default countryEventHandlers;

type GetProvincePayload = {
  token: string;
  gameId: string;
  mapRef: string;
};

type DemandProvincePayload = {
  token: string;
  gameId: string;
  countryId: string;
  targetCountryId: string;
  mapRef: string;
};
