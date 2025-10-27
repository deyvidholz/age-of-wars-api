import 'dotenv/config';
import { MathHelper } from '../../../helpers/math.helper';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Game } from '../../game/game.entity';

export async function guaranteeIndependenceAction(
  data: GuaranteeIndependenceActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country, game, targetId } = data;
  const target = game.countries.find((country) => country.id === targetId);

  if (!target) {
    return ResponseHelper.error({
      message: `Target not found`,
      data: { targetId },
    });
  }

  const minMilitaryPowerDiff: number =
    +process.env.MIN_MILITARY_POWER_DIFF_TO_GUARANTEE_INDEPENDENCE;
  const mpDiff = MathHelper.getDiffPercentage(
    country.militaryPower.total,
    target.militaryPower.total
  );

  if (mpDiff < minMilitaryPowerDiff) {
    return ResponseHelper.error({
      message: `You are not as strong as needed to guarantee ${target.name}'s independence`,
    });
  }

  const hasFriendlyRelations = country.hasFriendlyRelations(target.id, false);

  if (hasFriendlyRelations) {
    return ResponseHelper.error({
      message: `You cannot guarantee ${target.name}'s independence`,
    });
  }

  const hasBadRelations = country.hasBadRelations(target.id);

  if (hasBadRelations) {
    return ResponseHelper.error({
      message: `You cannot guarantee ${target.name}'s independence`,
    });
  }

  country.guaranteeIndependenceOf(target.getCountrySimplifiedData());
  target.addIndependenceGuaranteedBy(country.getCountrySimplifiedData());

  return ResponseHelper.success({
    message: `${country.name} is now guaranteeing ${target.name}'s independence`,
  });
}

type GuaranteeIndependenceActionParam = {
  targetId: string;
  country: Country;
  game: Game;
};
