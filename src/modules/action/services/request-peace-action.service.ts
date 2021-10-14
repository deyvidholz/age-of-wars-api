import { v4 } from 'uuid';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Decision, DecisionMakeType } from '../../country/country.typing';
import { Game } from '../../game/game.entity';
import { WarHelper } from '../../war/war.helper';
import { PeaceRequest } from '../../war/war.typing';
import { ActionType } from '../action.typing';

export async function requestPeaceAction(
  data: RequestPeaceActionParam
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

  const war = game.wars.find((w) => w.id === data.warId);

  if (!war) {
    return ResponseHelper.error({
      message: 'War not found',
      data: {
        id: data.warId,
      },
    });
  }

  const attacker = game.countries.find((c) => c.id === war.details.attacker.id);
  const victim = game.countries.find((c) => c.id === war.details.victim.id);

  if (attacker || victim) {
    return ResponseHelper.error({
      message: 'Attacker or victim not found',
    });
  }

  if (!WarHelper.isParticipating(war, target.id)) {
    return ResponseHelper.error({
      message: 'You are not participating of this war',
    });
  }

  const decision: Decision = {
    id: v4(),
    actionType: ActionType.ACCEPT_PEACE_REQUEST,
    duration: 1,
    types: [
      DecisionMakeType.ACCEPT_PEACE_REQUEST,
      DecisionMakeType.REFUSE_PEACE_REQUEST,
    ],
    description: `Accept peace request from ${country.name}`,
    data: {
      warId: war.id,
      peaceRequest: data.peaceRequest,
    },
  };

  let targetName = '{targetName}';
  if (war.details.attacker.id === target.id) {
    // Send peace request to victim
    decision.target = {
      id: victim.id,
      flag: victim.flag,
      name: victim.name,
    };
    victim.decisions.push(decision);
    targetName = victim.name;
  } else {
    // Send peace request to attacker
    decision.target = {
      id: attacker.id,
      flag: attacker.flag,
      name: attacker.name,
    };
    attacker.decisions.push(decision);
    targetName = attacker.name;
  }

  return ResponseHelper.success({
    message: `${target.name} sent a peace request to ${targetName}`,
    data: { decision },
  });
}

type RequestPeaceActionParam = {
  peaceRequest: PeaceRequest;
  country: Country;
  game: Game;
  targetId: string;
  warId: string;
};
