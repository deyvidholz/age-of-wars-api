import 'dotenv/config';
import { PersonalityType } from '../../data/templates/personalities.template';
import { MathHelper } from '../../helpers/math.helper';
import { ActionType } from '../action/action.typing';
import { Country } from '../country/country.entity';

export class AiHelper {
  static generateActionTypes(data: GenerateActionTypes): ActionType[] {
    const { country, gameStageCount } = data;
    const availableActions: ActionType[] = [
      ActionType.IMPROVE_PROVINCES,
      ActionType.SHOP,
    ];

    let maxGeneratedActions: number = +process.env.MAX_GENERATED_ACTIONS;
    let maxAiAlliesAllowed: number = +process.env.MAX_AI_ALLIES_ALLOWED;
    let allowChangeFocusEveryStage: number =
      +process.env.ALLOW_CHANGE_FOCUS_EVERY_STAGE;

    switch (country.personality.type) {
      case PersonalityType.AGGRESSIVE:
        if (!country.inWarWith.length) {
          availableActions.push(ActionType.SEND_INSULT);
          // TODO bots are declaring to many wars
          if (!country.inWarWith.length) {
            availableActions.push(
              ActionType.DECLARE_WAR,
              ActionType.DECLARE_WAR
            );
          }
        }
        break;
      case PersonalityType.NEUTRAL:
        if (!country.inWarWith.length) {
          availableActions.push(ActionType.SEND_INSULT);
          if (!country.inWarWith.length) {
            availableActions.push(ActionType.DECLARE_WAR);
          }
        }
        break;
    }

    if (country.allies.length < maxAiAlliesAllowed) {
      availableActions.push(ActionType.REQUEST_ALLY);
    }

    const canChangeFocus =
      gameStageCount <= 3 || gameStageCount % allowChangeFocusEveryStage === 0;

    if (canChangeFocus) {
      availableActions.push(ActionType.CHANGE_FOCUS);
    }

    const possibleActions: ActionType[] = [];

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
  country: Country;
  gameStageCount: number;
};
