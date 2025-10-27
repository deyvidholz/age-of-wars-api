import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { SetOpinionOfActionParam } from '../../country/country.typing';
import { Game } from '../../game/game.entity';

export async function sendInsultAction(
  data: SendInsultActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country } = data;

  const target: Country = game.countries.find(
    (country: Country) => country.id === data.targetId
  );

  if (!target) {
    return ResponseHelper.error({
      message: 'Target not found',
      data: {
        id: data.targetId,
      },
    });
  }

  if (country.hasIndependenceGuaranteeRelations(target.id)) {
    country.removeIndependenceGuaranteeingRelations(target.id);
    target.removeIndependenceGuaranteeingRelations(country.id);
  }

  country.setOpinionOf(target.name, 30, SetOpinionOfActionParam.SUBTRACT);
  target.setOpinionOf(country.name, 60, SetOpinionOfActionParam.SUBTRACT);

  country.messages.push({
    stage: data.game.stageCount,
    title: `We insulted ${target.name}, their opinon of us is now ${
      target.opinions[country.name]
    }`,
    data: {
      target: {
        id: target.id,
        flag: target.flag,
        name: target.name,
      },
    },
  });

  target.messages.push({
    stage: data.game.stageCount,
    title: `${country.name} insulted us, our opinion of them is now ${
      target.opinions[country.name]
    }`,
    data: {
      country: {
        id: country.id,
        flag: country.flag,
        name: country.name,
      },
    },
  });

  return ResponseHelper.success({
    message: `${country.name} insulted ${target.name}`,
  });
}

type SendInsultActionParam = {
  targetId: string;
  country: Country;
  game: Game;
};
