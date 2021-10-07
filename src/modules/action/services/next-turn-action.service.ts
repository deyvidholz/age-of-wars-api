import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Game } from '../../game/game.entity';
import { Action } from '../action.typing';

export async function nextTurnAction(
  data: NextTurnActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country } = data;

  if (country.owner?.id !== data.playerId) {
    return ResponseHelper.error({
      message:
        'You cannot send actions to a country that you are not the owner',
    });
  }

  const player =
    data.playerId === game.owner.id
      ? game.owner
      : game.players.find((p) => p.id === data.playerId);

  if (!player) {
    return ResponseHelper.error({
      message: 'Player not found',
      data: {
        playerId: data.playerId,
      },
    });
  }

  country.actions = [...data.actions];
  player.alreadyPlayed = true;

  return ResponseHelper.success({
    message: `${country.name} is ready for the next stage`,
    data: { actions: data.actions, nextTurn: await game.setNextTurn() },
  });
}

type NextTurnActionParam = {
  actions: Action[];
  country: Country;
  playerId: string;
  game: Game;
};
