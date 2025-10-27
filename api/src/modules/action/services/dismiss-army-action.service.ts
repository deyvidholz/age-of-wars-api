import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Army } from '../../country/country.typing';

export async function dismissArmyAction(
  data: DismissArmyParam
): Promise<SuccessResponse | ErrorResponse> {
  const { country } = data;
  let keys = Object.keys(data.qty);

  for (const armyType of keys) {
    if (data.qty[armyType] < 0) {
      data.qty[armyType] = 0;
    }

    if (data.qty[armyType] > country.army[armyType]) {
      country.army[armyType] = 0;
      continue;
    }

    country.army[armyType] -= data.qty[armyType];
  }

  return ResponseHelper.success({
    data: { country },
  });
}

type DismissArmyParam = {
  country: Country;
  qty: Army;
};
