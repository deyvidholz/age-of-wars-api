import 'dotenv/config';
import { v4 } from 'uuid';
import {
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../data/templates/country-passives.template';
import { MathHelper } from '../../helpers/math.helper';
import { ErrorResponse, SuccessResponse } from '../../helpers/response.helper';
import { AiService } from '../ai/ai.service';
import { CountryHelper } from '../country/country.helper';
import { DecisionMakeType } from '../country/country.typing';
import { Game } from '../game/game.entity';
import { WarHelper } from '../war/war.helper';
import { WarParticipantType, WarStage } from '../war/war.typing';
import { ActionType } from './action.typing';
import { acceptAllyRequestAction } from './services/accept-ally-request-action.service';
import { acceptPeaceRequestAction } from './services/accept-peace-request-action.service';
import { breakAllianceAction } from './services/break-alliance-action.service';
import { changeFocusAction } from './services/change-focus-action.service';
import { declareWarAction } from './services/declare-war-action.service';
import { dismissArmyAction } from './services/dismiss-army-action.service';
import { guaranteeIndependenceAction } from './services/guarantee-independence-action.service';
import { improveProvincesAction } from './services/improve-provinces-action.service';
import { improveRelationsAction } from './services/improve-relations-action.service';
import { joinWarAction } from './services/join-war-action.service';
import { nextTurnAction } from './services/next-turn-action.service';
import { refuseAllyRequestAction } from './services/refuse-ally-request-action.service';
import { removeIndependenceGuaranteeingAction } from './services/remove-independence-guaranteeing-action.service';
import { requestAllyAction } from './services/request-ally-action.service';
import { sendInsultAction } from './services/send-insult-action.service';
import { shopAction } from './services/shop-action.service';

export class ActionService {
  static async runActions(data: RunActionsParam) {
    console.log('running actions');
    const aggressivenessReduction =
      +process.env.AGGRESSIVENESS_REDUCTION_PER_STAGE;

    for (const country of data.game.countries) {
      const hasCapital = country.provinces.some(
        (province) => province.isCapital
      );

      if (!hasCapital) {
        country.setNewCapital();
      }

      for (const passive of country.passives) {
        if (typeof passive.duration === 'undefined') {
          continue;
        }

        passive.duration--;
      }

      country.passives = country.passives.filter(
        (passive) =>
          typeof passive.duration !== 'undefined' && passive.duration > -1
      );

      for (const decision of country.decisions) {
        if (typeof decision.duration === 'undefined') {
          continue;
        }

        decision.duration--;
      }

      country.decisions = country.decisions.filter(
        (decision) =>
          !decision.decided &&
          typeof decision.duration !== 'undefined' &&
          decision.duration > -1
      );

      if (country.isAi) {
        // TODO add money verification for some generated actions

        await AiService.runDecisions({
          country,
          game: data.game,
        });

        await AiService.generateActions({
          country,
          game: data.game,
        });
      }

      country.economy.balance += country.incoming.balance || 0;
      country.resources.oil += country.incoming.oil || 0;
      country.reduceAggressiveness(aggressivenessReduction);

      for (const message of country.messages) {
        if (!message.stage) {
          message.stage = data.game.stageCount;
        }
      }

      country.messages = country.messages.filter(
        (message) => message.stage >= data.game.stageCount
      );

      if (!country.actions.length) {
        continue;
      }

      for (const action of country.actions) {
        let response: SuccessResponse | ErrorResponse;

        switch (action.type) {
          case ActionType.DECLARE_WAR:
            response = await declareWarAction({
              country,
              callToWar: action.data?.callToWar || [],
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.ACCEPT_PEACE_REQUEST:
            response = await acceptPeaceRequestAction({
              country,
              game: data.game,
              decisionId: action.data.decisionId,
            });
            break;

          case ActionType.CHANGE_FOCUS:
            response = await changeFocusAction({
              country,
              focusType: action.data?.focusType,
              game: data.game,
            });
            break;

          case ActionType.CREATE_COALITION:
            break;

          case ActionType.IMPROVE_PROVINCES:
            response = await improveProvincesAction({
              country,
              game: data.game,
              provincesToImprove: action.data?.provincesToImprove,
            });
            break;

          case ActionType.IMPROVE_RELATIONS:
            response = await improveRelationsAction({
              country,
              game: data.game,
              targetId: action.data.targetId,
            });
            break;

          case ActionType.JOIN_COALITION:
            break;

          case ActionType.JOIN_WAR:
            response = await joinWarAction({
              allyCountryId: action.data?.allyCountryId,
              decisionId: action.data?.decisionId,
              country,
              game: data.game,
              warId: action.data?.warId,
            });
            break;

          case ActionType.NEXT_TURN:
            response = await nextTurnAction({
              actions: action.data?.actions,
              country,
              game: data.game,
              playerId: action.playerId,
            });
            break;

          case ActionType.REQUEST_ALLY:
            response = await requestAllyAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.BREAK_ALLIANCE:
            response = await breakAllianceAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.REQUEST_PEACE:
            break;

          case ActionType.SEND_INSULT:
            response = await sendInsultAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.SHOP:
            response = await shopAction({
              country,
              game: data.game,
              order: action.data?.order,
            });
            break;

          case ActionType.GUARANTEE_INDEPENDENCE:
            response = await guaranteeIndependenceAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.REMOVE_INDEPENDENCE_GUARANTEEING:
            response = await removeIndependenceGuaranteeingAction({
              country,
              game: data.game,
              targetId: action.data?.targetId,
            });
            break;

          case ActionType.DISMISS_ARMY:
            response = await dismissArmyAction({
              country,
              qty: action.data.qty,
            });
            break;

          case ActionType.ACCEPT_ALLY_REQUEST:
            response = await acceptAllyRequestAction({
              country,
              decisionId: action.data.decisionId,
              game: data.game,
            });

          case ActionType.REFUSE_ALLY_REQUEST:
            response = await refuseAllyRequestAction({
              country,
              decisionId: action.data.decisionId,
              game: data.game,
            });
        }

        if (!response) {
          response = {
            message: 'Invalid Action Type',
            error: true,
          };
        }

        if (response.error) {
          country.messages.push({
            stage: data.game.stageCount,
            title: response.message,
            data: response.data || null,
          });
        }
      } // for (country.actions)

      country.actions = [];
    } // for (data.game.countries)
  }

  static async runWars(data: RunWarsParam) {
    const { game } = data;

    for (const war of game.wars) {
      if (game.stageCount < war.startAtStage) {
        continue;
      }

      if (war.stage === WarStage.OVER) {
        continue;
      }

      const attackers = WarHelper.getAttackers(game, war);
      const victims = WarHelper.getVictims(game, war);

      const comparedInfo = WarHelper.getComparedInfo(
        game,
        war,
        attackers,
        victims
      );
      const lossesBySide = WarHelper.getLosses(game, war, comparedInfo);
      const splittedLosses = WarHelper.getSpllitedLosses(
        comparedInfo,
        lossesBySide,
        true
      );

      WarHelper.setLosses(game, war, splittedLosses);

      const mps = CountryHelper.sumWarMilitaryPowers({
        attackers,
        victims,
      });

      const isOver: boolean =
        mps.attackers.militaryPower.totals.total <= 0 ||
        mps.victims.militaryPower.totals.total <= 0;

      if (!isOver) {
        war.stage = WarStage.FIGHTING;
        continue;
      }

      console.log(
        `${war.details.attacker.name} x ${war.details.victim.name} is over`
      );
      war.stage = WarStage.OVER;

      let winner: WarParticipantType;

      if (mps.attackers.militaryPower.totals.total <= 0) {
        console.log('victim won!');
        winner = WarParticipantType.VICTIM;

        const provincesToFill: string[] = [];
        const attackersIds: string[] = [];
        const victimsIds = victims.map((c) => c.id);

        for (const attacker of attackers) {
          attacker.inWarWith = attacker.inWarWith.filter(
            (c) => !victimsIds.includes(c.id)
          );

          attackersIds.push(attacker.id);
          provincesToFill.push(
            ...attacker.provinces.map((province) => province.mapRef)
          );
        }

        for (const country of victims) {
          const participant = WarHelper.getParticipant(war, country.id);

          country.inWarWith = country.inWarWith.filter(
            (c) => !attackersIds.includes(c.id)
          );

          country.decisions.push({
            id: v4(),
            actionType: ActionType.DEMAND,
            types: [],
            description: `You won the war against ${war.details.attacker.name} and can demand provinces/resources.`,
            duration: 3,
            data: {
              warId: war.id,
              winner,
              allies: victims
                .filter((ally) => ally.id !== country.id)
                .map(
                  (ally) =>
                    ally.getCountrySimplifiedData() && ally.id !== country.id
                ),
              targets: attackers.map((target) =>
                target.getCountrySimplifiedData()
              ),
              provincesToFill,
              participation: participant.participation,
              maxProvincesAllowedToDemand: Math.ceil(
                MathHelper.getPercetageValue(
                  provincesToFill.length,
                  participant.participation
                )
              ),
            },
          });
        }
      } else if (mps.victims.militaryPower.totals.total <= 0) {
        console.log('attacker won!');
        winner = WarParticipantType.ATTACKER;

        const provincesToFill: string[] = [];
        const victimsIds: string[] = [];
        const attackersIds = attackers.map((c) => c.id);

        for (const victim of victims) {
          victimsIds.push(victim.id);

          victim.inWarWith = victim.inWarWith.filter(
            (c) => !attackersIds.includes(c.id)
          );

          if (victim.id === war.details.victim.id) {
            victim.passives.push({
              type: CountryPassiveType.INCREASE_TARGET_AGGRESSION_WHEN_ATTACKED,
              value: 230,
              valueType: CountryPassiveValueType.STATIC,
              duration: 20,
              description: `Increase attacker aggression by +230`,
            });
          }

          provincesToFill.push(
            ...victim.provinces.map((province) => province.mapRef)
          );
        }

        for (const country of attackers) {
          const participant = WarHelper.getParticipant(war, country.id);

          country.inWarWith = country.inWarWith.filter(
            (c) => !victimsIds.includes(c.id)
          );

          country.enemies = country.enemies.filter(
            (c) => c.id !== war.details.victim.id
          );

          country.decisions.push({
            id: v4(),
            actionType: ActionType.DEMAND,
            types: [],
            description: `You won the war against ${war.details.victim.name}.`,
            duration: 3,
            data: {
              warId: war.id,
              winner,
              allies: attackers
                .filter((ally) => ally.id !== country.id)
                .map((ally) => ally.getCountrySimplifiedData()),
              targets: victims.map((target) =>
                target.getCountrySimplifiedData()
              ),
              provincesToFill,
              participation: participant.participation,
              maxProvincesAllowedToDemand: Math.ceil(
                MathHelper.getPercetageValue(
                  provincesToFill.length,
                  participant.participation
                )
              ),
            },
          });
        }
      }

      war.winner = winner;
    }

    // Remove inWarWith

    game.wars = game.wars.filter((war) => war.stage !== WarStage.OVER);
  }
}

type RunActionsParam = {
  game: Game;
};

type RunWarsParam = {
  game: Game;
};
