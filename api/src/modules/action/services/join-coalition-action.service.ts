import {
  ErrorResponse,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Game } from '../../game/game.entity';

export async function joinCoalitionAction(
  data: JoinCoalitionActionParam
): Promise<SuccessResponse | ErrorResponse> {
  return {};
}

type JoinCoalitionActionParam = {
  focusName: string;
  countryId: string;
  game: Game;
};
