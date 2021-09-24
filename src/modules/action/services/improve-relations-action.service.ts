import {
  ErrorResponse,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Game } from '../../game/game.entity';

export async function improveRelationsAction(
  data: ImproveRelationsActionParam
): Promise<SuccessResponse | ErrorResponse> {
  return {};
}

type ImproveRelationsActionParam = {
  focusName: string;
  countryId: string;
  game: Game;
};
