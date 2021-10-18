import 'dotenv/config';
import { PersonalityType } from '../../data/templates/personalities.template';
import { GameHelper } from '../../helpers/game.helper';
import { MathHelper } from '../../helpers/math.helper';
import { ActionType } from '../action/action.typing';
import { CoalitionHelper } from '../coalition/coalition.helper';
import { Country } from '../country/country.entity';
import { Game } from '../game/game.entity';

export class AiHelper {
  static generateActionTypes(data: GenerateActionTypes): ActionType[] {
    const { country, game, gameStageCount, forceChangeFocus } = data;
    const availableActions: ActionType[] = [
      ActionType.IMPROVE_PROVINCES,
      ActionType.SHOP,
    ];

    let maxGeneratedActions: number = +process.env.MAX_GENERATED_ACTIONS;
    let maxAiAlliesAllowed: number = +process.env.MAX_AI_ALLIES_ALLOWED;

    switch (country.personality.type) {
      case PersonalityType.AGGRESSIVE:
        if (!country.inWarWith.length) {
          availableActions.push(ActionType.SEND_INSULT);
          // TODO bots are declaring to many wars
          if (!country.inWarWith.length && MathHelper.chanceOf(20)) {
            if (
              !CoalitionHelper.isParticipatingOfAnyCoalition({ game, country })
            ) {
              availableActions.push(ActionType.DECLARE_WAR);
            }
          }
        }
        break;
      case PersonalityType.NEUTRAL:
        if (!country.inWarWith.length) {
          availableActions.push(ActionType.SEND_INSULT);
          if (!country.inWarWith.length && MathHelper.chanceOf(7)) {
            if (
              !CoalitionHelper.isParticipatingOfAnyCoalition({ game, country })
            ) {
              availableActions.push(ActionType.DECLARE_WAR);
            }
          }
        }
        break;
    }

    if (country.allies.length < maxAiAlliesAllowed) {
      availableActions.push(ActionType.REQUEST_ALLY);
    }

    const canChangeFocus = GameHelper.canChangeFocus(game.stageCount);

    if (canChangeFocus && !forceChangeFocus) {
      availableActions.push(ActionType.CHANGE_FOCUS);
    }

    const possibleActions: ActionType[] = [];

    if (forceChangeFocus) {
      possibleActions.push(ActionType.CHANGE_FOCUS);
    }

    for (let i = 0; i < maxGeneratedActions; i++) {
      if (!availableActions.length) {
        continue;
      }

      const randomNumber = MathHelper.getRandomNumber(40, 60);

      if (!MathHelper.chanceOf(randomNumber)) {
        continue;
      }

      const index = MathHelper.getRandomIndex(availableActions);
      const action = availableActions[index];

      availableActions.splice(index, 1);
      possibleActions.push(action);
    }

    return possibleActions;
  }
}

type GenerateActionTypes = {
  game: Game;
  country: Country;
  gameStageCount: number;
  forceChangeFocus: boolean;
};
