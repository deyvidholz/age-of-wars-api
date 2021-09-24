import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Decision, DecisionType } from '../../country/country.typing';
import { Game } from '../../game/game.entity';
import { PeaceRequest } from '../../war/war.typing';

export async function requestPeaceAction(
  data: RequestPeaceActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game } = data;
  const country: Country = game.countries.find(
    (country: Country) => country.id === data.countryId
  );

  if (!country) {
    return ResponseHelper.error({
      message: 'Country not found',
      data: {
        id: data.countryId,
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

  if (!war.isParticipating(country.id)) {
    return ResponseHelper.error({
      message: 'You are not participating of this war',
    });
  }

  const decision: Decision = {
    types: [
      DecisionType.ACCEPT_PEACE_REQUEST,
      DecisionType.REFUSE_PEACE_REQUEST,
    ],
    data: {
      peaceRequest: data.peaceRequest,
    },
  };

  let targetName = '{targetName}';
  if (war.details.attacker.id === country.id) {
    // Send peace request to victim
    victim.decisions.push(decision);
    targetName = victim.name;
  } else {
    // Send peace request to attacker
    attacker.decisions.push(decision);
    targetName = attacker.name;
  }

  return ResponseHelper.success({
    message: `${country.name} sent a peace request to ${targetName}`,
    data: { decision },
  });
}

type RequestPeaceActionParam = {
  peaceRequest: PeaceRequest;
  countryId: string;
  warId: string;
  game: Game;
};
