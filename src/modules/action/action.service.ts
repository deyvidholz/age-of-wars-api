import 'dotenv/config';
import { v4 } from 'uuid';
import { MathHelper } from '../../helpers/math.helper';
import { ErrorResponse, SuccessResponse } from '../../helpers/response.helper';
import { AiService } from '../ai/ai.service';
import { CountryHelper } from '../country/country.helper';
import { DecisionMakeType } from '../country/country.typing';
import { Game } from '../game/game.entity';
import { WarHelper } from '../war/war.helper';
import { WarParticipantType } from '../war/war.typing';
import { ActionType } from './action.typing';
import { acceptAllyRequestAction } from './services/accept-ally-request-action.service';
import { acceptPeaceRequestAction } from './services/accept-peace-request-action.service';
import { changeFocusAction } from './services/change-focus-action.service';
import { declareWarAction } from './services/declare-war-action.service';
import { dismissArmyAction } from './services/dismiss-army-action.service';
import { improveProvincesAction } from './services/improve-provinces-action.service';
import { improveRelationsAction } from './services/improve-relations-action.service';
import { joinWarAction } from './services/join-war-action.service';
import { nextTurnAction } from './services/next-turn-action.service';
import { refuseAllyRequestAction } from './services/refuse-ally-request-action.service';
import { requestAllyAction } from './services/request-ally-action.service';
import { sendInsultAction } from './services/send-insult-action.service';
import { shopAction } from './services/shop-action.service';

export class ActionService {
  static async runActions(data: RunActionsParam) {
    console.log('running actions');
    const aggressivenessReduction =
      +process.env.AGGRESSIVENESS_REDUCTION_PER_STAGE;

    for (const country of data.game.countries) {
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
            response = await requestAllyAction({
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
      if (war.isOver) {
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
        continue;
      }

      console.log(
        `${war.details.attacker.name} x ${war.details.victim.name} is over`
      );
      war.isOver = true;

      let winner: WarParticipantType;

      if (mps.attackers.militaryPower.totals.total <= 0) {
        console.log('victim won!');
        winner = WarParticipantType.VICTIM;

        const provincesToFill: string[] = [];
        for (const attacker of attackers) {
          provincesToFill.push(
            ...attacker.provinces.map((province) => province.mapRef)
          );
        }

        for (const country of victims) {
          country.decisions.push({
            id: v4(),
            actionType: ActionType.DEMAND,
            types: [],
            description: `You won the war against ${war.details.attacker.name} and can demand provinces/resources.`,
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
            },
          });
        }
      } else if (mps.victims.militaryPower.totals.total <= 0) {
        console.log('attacker won!');
        winner = WarParticipantType.ATTACKER;

        const provincesToFill: string[] = [];
        for (const victim of victims) {
          provincesToFill.push(
            ...victim.provinces.map((province) => province.mapRef)
          );
        }

        for (const country of attackers) {
          country.decisions.push({
            id: v4(),
            actionType: ActionType.DEMAND,
            types: [],
            description: `You won the war against ${war.details.victim.name}.`,
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
            },
          });
        }
      }

      war.winner = winner;
    }
  }
}

type RunActionsParam = {
  game: Game;
};

type RunWarsParam = {
  game: Game;
};
