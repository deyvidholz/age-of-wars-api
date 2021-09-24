import {
  ErrorResponse,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Game } from '../../game/game.entity';

export async function acceptPeaceRequestAction(
  data: AcceptPeaceRequestActionParam
): Promise<SuccessResponse | ErrorResponse> {
  return {};
}

type AcceptPeaceRequestActionParam = {
  focusName: string;
  countryId: string;
  game: Game;
};
