import 'dotenv/config';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import {
  DecisionType,
  SetOpinionOfActionParam,
} from '../../country/country.typing';
import { Game } from '../../game/game.entity';

export async function acceptAllyRequestAction(
  data: AcceptAllyRequestActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country, decisionId, game } = data;

  const decision = country.decisions.find(
    (decision) => decision.id === decisionId
  );

  if (!decision) {
    return ResponseHelper.error({
      message: 'Decision not found',
      data: { decisionId },
    });
  }

  if (!decision.types.includes(DecisionType.ACCEPT_ALLY_REQUEST)) {
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

  country.addAlly({
    flag: requester.flag,
    name: requester.name,
    id: requester.id,
  });

  requester.addAlly({
    flag: country.flag,
    name: country.name,
    id: country.id,
  });

  country.setOpinionOf(
    requester.name,
    +process.env.ADD_OPINION_WHEN_JOIN_ALLIANCE,
    SetOpinionOfActionParam.SUM
  );

  requester.setOpinionOf(
    country.name,
    +process.env.ADD_OPINION_WHEN_TARGET_ACCEPT_JOIN_ALLIANCE,
    SetOpinionOfActionParam.SUM
  );

  country.messages.push({
    stage: data.game.stageCount,
    title: `${requester.name} accepted our ally request`,
    data: {
      target: {
        id: requester.id,
        flag: requester.flag,
        name: requester.name,
      },
    },
  });

  requester.messages.push({
    stage: data.game.stageCount,
    title: `We and ${country.name} are now allied`,
    data: {
      target: {
        id: country.id,
        flag: country.flag,
        name: country.name,
      },
    },
  });

  return ResponseHelper.success({
    message: `${country.name} accepted ${requester.name} ally's request`,
  });
}

type AcceptAllyRequestActionParam = {
  decisionId: string;
  country: Country;
  game: Game;
};
