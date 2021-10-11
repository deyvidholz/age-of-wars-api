import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { CountryHelper } from '../../country/country.helper';
import { DecisionMakeType } from '../../country/country.typing';
import { Game } from '../../game/game.entity';
import { WarHelper } from '../../war/war.helper';
import { PeaceRequest, WarStage } from '../../war/war.typing';

// TODO test
export async function acceptPeaceRequestAction(
  data: AcceptPeaceRequestActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country, game, decisionId } = data;

  const decision = country.decisions.find(
    (decision) => decision.id === decisionId
  );

  if (!decision) {
    return ResponseHelper.error({
      message: 'Decision not found',
      data: { decisionId },
    });
  }

  if (!decision.types.includes(DecisionMakeType.ACCEPT_PEACE_REQUEST)) {
    return ResponseHelper.error({
      message: 'Invalid decision type',
      data: { decision },
    });
  }

  const peaceRequest: PeaceRequest = decision.data.peaceRequest;

  const target = game.countries.find(
    (country) => country.id === decision.target.id
  );

  if (!target) {
    return ResponseHelper.error({
      message: 'Target not found',
      data: { decision },
    });
  }

  const war = game.wars.find((war) => war.id === decision.data.warId);

  if (!war) {
    return ResponseHelper.error({
      message: 'War not found',
      data: { decision },
    });
  }

  if (!WarHelper.isParticipating(war, country.id)) {
    return ResponseHelper.error({
      message: `Country ${country.name} is not participating of this war`,
      data: { war },
    });
  }

  country.decisions = country.decisions.filter(
    (decision) => decision.id !== decisionId
  );

  const addAsEnemy =
    (war.details.attacker.id === country.id ||
      war.details.attacker.id === target.id) &&
    (war.details.victim.id === country.id ||
      war.details.victim.id === target.id);

  if (addAsEnemy) {
    country.addEnemy({
      flag: target.flag,
      name: target.name,
      id: target.id,
    });

    target.addEnemy({
      flag: country.flag,
      name: country.name,
      id: country.id,
    });
  }

  WarHelper.givePeaceRequestStuff({
    peaceRequest,
    requester: target,
    target: country,
  });

  country.removeInWarWith(target.id);
  target.removeInWarWith(country.id);

  const participants = WarHelper.getParticipants(game, war);
  participants.attackers = participants.attackers.filter(
    (c) => c.id !== country.id && c.id !== target.id
  );
  participants.victims = participants.victims.filter(
    (c) => c.id !== country.id && c.id !== target.id
  );

  country.messages.push({
    stage: data.game.stageCount,
    title: `We accepted ${target.name}'s peace request`,
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
    title: `${country.name} accepted our peace request`,
    data: {
      country: {
        id: country.id,
        flag: country.flag,
        name: country.name,
      },
    },
  });

  CountryHelper.addMessages(
    [...participants.attackers, ...participants.victims],
    {
      title: `${country.name} accepted a peace request from ${target.name}`,
      data: {
        country: country.getCountrySimplifiedData(),
        target: target.getCountrySimplifiedData(),
      },
    }
  );

  if (
    WarHelper.isWarOwner(war, country.id) &&
    WarHelper.isWarOwner(war, target.id)
  ) {
    // War is Over
    country.messages.push({
      stage: data.game.stageCount,
      title: `Our war against ${target.name} is over`,
      data: {
        target: target.getCountrySimplifiedData(),
      },
    });

    target.messages.push({
      stage: data.game.stageCount,
      title: `Our war against ${country.name} is over`,
      data: {
        country: country.getCountrySimplifiedData(),
      },
    });

    CountryHelper.addMessages(
      [...participants.attackers, ...participants.victims],
      {
        title: `${country.name} x ${target.name} war is over`,
        data: {
          country: country.getCountrySimplifiedData(),
          target: target.getCountrySimplifiedData(),
        },
      }
    );

    game.wars = game.wars.filter((w) => w.id !== war.id);
    war.stage = WarStage.OVER;
  } else {
    WarHelper.removeParticipant(war, target.id);
  }

  return ResponseHelper.success({
    message: `${country.name} accepted ${target.name}'s peace request`,
    data: { war },
  });
}

type AcceptPeaceRequestActionParam = {
  decisionId: string;
  country: Country;
  game: Game;
};
