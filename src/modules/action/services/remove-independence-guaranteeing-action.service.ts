import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Game } from '../../game/game.entity';

export async function removeIndependenceGuaranteeingAction(
  data: RemoveIndependenceGuaranteeingActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country, game, targetId } = data;
  const target = game.countries.find((country) => country.id === targetId);

  if (!target) {
    return ResponseHelper.error({
      message: `Target not found`,
      data: { targetId },
    });
  }

  country.removeGuaranteeIndependenceOf(targetId);
  target.removeIndependenceGuaranteedBy(country.id);

  return ResponseHelper.success({
    message: `${country.name} stopped guaranteeing ${target.name}'s independence`,
  });
}

type RemoveIndependenceGuaranteeingActionParam = {
  targetId: string;
  country: Country;
  game: Game;
};
