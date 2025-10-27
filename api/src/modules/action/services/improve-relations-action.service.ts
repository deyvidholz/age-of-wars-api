import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Game } from '../../game/game.entity';

export async function improveRelationsAction(
  data: ImproveRelationsActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country, game, targetId } = data;
  const target = game.countries.find((country) => country.id === targetId);

  if (!target) {
    return ResponseHelper.error({
      message: 'Target not found',
      data: { targetId },
    });
  }

  if (country.isImprovingRelationsOf(targetId)) {
    return ResponseHelper.error({
      message: `You are already improving relations of ${target.name}`,
      data: {
        target: target.getCountrySimplifiedData(),
      },
    });
  }

  country.addImproveRelations(target.getCountrySimplifiedData());

  return ResponseHelper.success({
    message: `You are now improving relations of ${target.name}`,
  });
}

type ImproveRelationsActionParam = {
  country: Country;
  targetId: string;
  game: Game;
};
