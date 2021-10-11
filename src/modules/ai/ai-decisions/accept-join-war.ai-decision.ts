import 'dotenv/config';
import { MathHelper } from '../../../helpers/math.helper';
import { ActionType } from '../../action/action.typing';
import { Country } from '../../country/country.entity';
import { CountryService } from '../../country/country.service';
import { Decision } from '../../country/country.typing';
import { Game } from '../../game/game.entity';
import { WarHelper } from '../../war/war.helper';

export async function acceptJoinWarAiDecision(
  data: AcceptJoinWarAiDecisionParam
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

  const warId = decision.data.warId;

  if (!warId) {
    return;
  }

  const war = game.wars.find((war) => war.id === warId);

  if (!war) {
    return;
  }

  /**
   * With an opinion of 200 about requester, the chance of accepting the alliance request will be 50%.
   */
  let chance: number = opinion.value / 4;
  let acceptJoinWar: boolean = false;
  let forceRefuse: boolean = false;
  let forceAccept: boolean = false;
  let isRequesterAttacker: boolean = WarHelper.isAttacker(war, requester.id);

  if (country.isGuaranteeingIndependenceOf(requester.id)) {
    /**
     * When guaranteeing independence, if the attacker is the requester,
     * the requested country will not join the war.
     *
     * When the country is the victim (country being attacked),
     * requested country will join the war.
     */

    if (isRequesterAttacker) {
      forceRefuse = true;
    } else {
      forceAccept = true;
    }
  }

  if (country.isAlliedWith(requester.id)) {
    chance *= 2;
  }

  if (requester.isAi) {
    chance = 100;
  }

  /**
   * If requester is attacker and is not as stronger as the victim,
   * chance of the country accept join the war will decrease.
   */
  if (isRequesterAttacker) {
    const response = await CountryService.getWarSimulation({
      attacker: war.details.attacker.name,
      target: war.details.victim.name,
      gameId: game.id,
      game,
    });

    if (response.error) {
      return;
    }

    const attackersTotalMP =
      response.data.simulation.totals.attackers.militaryPower.totals.total;
    const victimsTotalMP =
      response.data.simulation.totals.victims.militaryPower.totals.total;

    if (MathHelper.getDiffPercentage(attackersTotalMP, victimsTotalMP) < 40) {
      chance /= 3;
    }
  }

  /**
   * Due to penalities, in case of requested country is at war with someone,
   * they will never join another war.
   */
  if (country.inWarWith.length) {
    forceRefuse = true;
    forceAccept = false;
  }

  if (MathHelper.chanceOf(chance)) {
    acceptJoinWar = true;
  }

  if (!forceAccept && (forceRefuse || !acceptJoinWar)) {
    country.actions.push({
      type: ActionType.REFUSE_JOIN_WAR,
      data: {
        decisionId: decision.id,
        allyCountryId: requester.id,
        warId: war.id,
      },
    });
    return;
  }

  country.actions.push({
    type: ActionType.JOIN_WAR,
    data: {
      decisionId: decision.id,
      allyCountryId: requester.id,
      warId: war.id,
    },
  });
}

type AcceptJoinWarAiDecisionParam = {
  country: Country;
  game: Game;
  decision: Decision;
};
