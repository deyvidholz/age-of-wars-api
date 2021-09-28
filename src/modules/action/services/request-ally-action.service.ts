import { v4 } from 'uuid';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Decision, DecisionType } from '../../country/country.typing';
import { Game } from '../../game/game.entity';

export async function requestAllyAction(
  data: RequestAllyActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country } = data;

  const target: Country = game.countries.find(
    (country: Country) => country.id === data.targetId
  );

  if (!target) {
    return ResponseHelper.error({
      message: 'Target not found',
      data: {
        targetId: data.targetId,
      },
    });
  }

  if (country.isAtWarWith(target.id)) {
    return ResponseHelper.error({
      message:
        'You cannot send alliance request to a country that you are at war with',
    });
  }

  if (country.isAlliedWith(target.id)) {
    return ResponseHelper.error({
      message: `You and ${target.name} are already allies`,
    });
  }

  const decision: Decision = {
    id: v4(),
    types: [DecisionType.ACCEPT_ALLY_REQUEST, DecisionType.REFUSE_ALLY_REQUEST],
    requester: {
      flag: country.flag,
      name: country.name,
      id: country.id,
    },
  };

  target.decisions.push(decision);

  target.messages.push({
    description: `${target.name} wants to be our ally`,
    data: {
      country: {
        flag: country.flag,
        name: country.name,
        id: country.id,
      },
    },
  });

  country.messages.push({
    description: `You requested ${target.name} to be your ally`,
    data: {
      target: {
        flag: target.flag,
        name: target.name,
        id: target.id,
      },
    },
  });

  return ResponseHelper.success({
    message: `${country.name} requested ${target.name} to be allied`,
  });
}

type RequestAllyActionParam = {
  targetId: string;
  country: Country;
  game: Game;
};