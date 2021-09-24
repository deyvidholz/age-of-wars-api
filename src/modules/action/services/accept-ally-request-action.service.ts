import {
  ErrorResponse,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Game } from '../../game/game.entity';

export async function acceptAllyRequestAction(
  data: AcceptAllyRequestActionParam
): Promise<SuccessResponse | ErrorResponse> {
  return {};
}

type AcceptAllyRequestActionParam = {
  focusName: string;
  countryId: string;
  game: Game;
};
