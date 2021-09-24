import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { Game } from '../game/game.entity';
import { Action, ActionType } from './action.typing';
import { changeFocusAction } from './services/change-focus-action.service';
import { declareWarAction } from './services/declare-war-action.service';
import { improveProvincesAction } from './services/improve-provinces-action.service';
import { joinWarAction } from './services/join-war-action.service';
import { nextTurnAction } from './services/next-turn-action.service';
import { requestAllyAction } from './services/request-ally-action.service';
import { sendInsultAction } from './services/send-insult-action.service';
import { shopAction } from './services/shop-action.service';

export class ActionService {
  static async runActions(data: RunActionsParam) {
    for (const country of data.game.countries) {
      country.messages = [];

      if (!country.actions.length) {
        continue;
      }

      for (const action of country.actions) {
        console.log('action', action);
        let response: SuccessResponse | ErrorResponse;

        switch (action.type) {
          case ActionType.DECLARE_WAR:
            response = await declareWarAction({
              country,
              callToWar: action.data?.callToWar || [],
              game: data.game,
              targetId: action.targetId,
            });
            break;

          case ActionType.ACCEPT_PEACE_REQUEST:
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
            break;

          case ActionType.JOIN_COALITION:
            break;

          case ActionType.JOIN_WAR:
            response = await joinWarAction({
              allyCountryId: action.data?.allyCountryId,
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
        }

        console.log('response', response);
        if (response.error) {
          country.messages.push({
            description: response.message,
            data: response.data || null,
          });
        }
      } // for (country.actions)

      country.actions = [];
    } // for (data.game.countries)
  }
}

type RunActionsParam = {
  game: Game;
};
