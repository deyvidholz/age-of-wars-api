import {
  ErrorResponse,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Game } from '../../game/game.entity';

export async function createCoalitionAction(
  data: CreateCoalitionActionParam
): Promise<SuccessResponse | ErrorResponse> {
  return {};
}

type CreateCoalitionActionParam = {
  focusName: string;
  countryId: string;
  game: Game;
};
