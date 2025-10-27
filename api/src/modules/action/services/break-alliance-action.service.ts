import 'dotenv/config';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { SetOpinionOfActionParam } from '../../country/country.typing';
import { Game } from '../../game/game.entity';

export async function breakAllianceAction(
  data: BreakAllianceActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country, game, targetId } = data;
  const target = game.countries.find((country) => country.id === targetId);

  if (!target) {
    return ResponseHelper.error({
      message: `Target not found`,
      data: { targetId },
    });
  }

  const subtractOpinionWhenBreakAlliance: number =
    +process.env.SUBTRACT_OPINION_WHEN_BREAK_ALLIANCE;

  country.removeAlly(targetId);
  target.removeAlly(country.id);
  target.setOpinionOf(
    country.name,
    subtractOpinionWhenBreakAlliance,
    SetOpinionOfActionParam.SUBTRACT
  );

  return ResponseHelper.success({
    message: `${country.name} break alliance with ${target.name}`,
  });
}

type BreakAllianceActionParam = {
  targetId: string;
  country: Country;
  game: Game;
};
