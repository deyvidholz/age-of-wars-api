import 'dotenv/config';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import {
  DecisionMakeType,
  SetOpinionOfActionParam,
} from '../../country/country.typing';
import { Game } from '../../game/game.entity';

export async function refuseAllyRequestAction(
  data: RefuseAllyRequestActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country, decisionId, game } = data;

  const decision = country.decisions.find(
    (decision) => decision.id === decisionId
  );

  if (!decision) {
    return;
  }

  if (!decision.types.includes(DecisionMakeType.REFUSE_ALLY_REQUEST)) {
    return ResponseHelper.error({
      message: 'Invalid decision type',
      data: { decision },
    });
  }

  const requester = game.countries.find(
    (country) => country.id === decision.requester.id
  );

  if (!requester) {
    return ResponseHelper.error({
      message: 'Requester not found',
      data: { decision },
    });
  }

  country.decisions = country.decisions.filter(
    (decision) => decision.id !== decisionId
  );

  if (country.hasIndependenceGuaranteeRelations(requester.id)) {
    requester.removeIndependenceGuaranteeingRelations(country.id);
    country.removeIndependenceGuaranteeingRelations(requester.id);
  }

  requester.setOpinionOf(
    country.name,
    +process.env.SUBTRACT_OPINION_WHEN_TARGET_REFUSE_JOIN_ALLIANCE,
    SetOpinionOfActionParam.SUBTRACT
  );

  requester.messages.push({
    stage: data.game.stageCount,
    title: `${country.name} refused our ally request`,
    data: {
      target: country.getCountrySimplifiedData(),
    },
  });

  return ResponseHelper.success({
    message: `${country.name} refused ${requester.name} ally's request`,
  });
}

type RefuseAllyRequestActionParam = {
  decisionId: string;
  country: Country;
  game: Game;
};
