import 'dotenv/config';
import {
  Focus,
  focuses,
  FocusType,
} from '../../../data/templates/focuses.template';
import { GameHelper } from '../../../helpers/game.helper';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Game } from '../../game/game.entity';

export async function changeFocusAction(
  data: ChangeFocusActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country } = data;

  const focus: Focus = focuses.find((f) => f.type === data.focusType);

  if (!focus) {
    return ResponseHelper.error({
      message: 'Focus not found',
      data: {
        focusType: data.focusType,
      },
    });
  }

  const canChangeFocus = GameHelper.canChangeFocus(game.stageCount);

  if (!canChangeFocus) {
    return ResponseHelper.error({
      message: 'Cannot change focus now',
    });
  }

  country.focus = { ...focus };

  country.messages.push({
    stage: data.game.stageCount,
    title: `We changed our focus to ${focus.name}`,
    description: null,
    data: {
      focus,
    },
  });

  return ResponseHelper.success({
    message: `${country.name} changed its focus to ${focus.type}`,
    data: country.focus,
  });
}

type ChangeFocusActionParam = {
  focusType: FocusType;
  country: Country;
  game: Game;
};
