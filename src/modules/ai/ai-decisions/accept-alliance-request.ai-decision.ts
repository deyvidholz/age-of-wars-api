import 'dotenv/config';
import { MathHelper } from '../../../helpers/math.helper';
import { ActionType } from '../../action/action.typing';
import { Country } from '../../country/country.entity';
import { Decision } from '../../country/country.typing';
import { Game } from '../../game/game.entity';

export async function acceptAllianceRequestAiDecision(
  data: AcceptAllianceRequestAiDecisionParam
) {
  const { country, decision, game } = data;
  const requester = game.countries.find(
    (country) => country.id === decision.requester.id
  );

  if (!requester) {
    return;
  }

  const opinion = country.getOpinionOf(requester.name);

  if (!opinion) {
    return;
  }

  let maxAiAlliesAllowed: number = +process.env.MAX_AI_ALLIES_ALLOWED;

  /**
   * With an opinion of 200 about requester, the chance of accepting the alliance request will be 50%.
   */
  let chance: number = opinion.value / 4;
  let acceptAllianceRequest: boolean = false;
  let forceRefuse: boolean = false;

  if (country.allies.length >= maxAiAlliesAllowed) {
    forceRefuse = true;
  }

  if (country.hasBadRelations(requester.id)) {
    forceRefuse = true;
  }

  if (MathHelper.chanceOf(chance)) {
    acceptAllianceRequest = true;
  }

  if (forceRefuse || !acceptAllianceRequest) {
    country.actions.push({
      type: ActionType.REFUSE_ALLY_REQUEST,
      data: {
        decisionId: decision.id,
      },
    });
    return;
  }

  country.actions.push({
    type: ActionType.ACCEPT_ALLY_REQUEST,
    data: {
      decisionId: decision.id,
    },
  });
}

type AcceptAllianceRequestAiDecisionParam = {
  country: Country;
  game: Game;
  decision: Decision;
};
