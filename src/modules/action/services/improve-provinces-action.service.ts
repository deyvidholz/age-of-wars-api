import { GeneralHelper } from '../../../helpers/general.helper';
import { MathHelper } from '../../../helpers/math.helper';
import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { ProvinceToImprove } from '../../country/country.typing';
import { Game } from '../../game/game.entity';
import { ShopHelper } from '../../shop/shop.helper';
import {
  ImproveProvinceOrder,
  ImproveProvinceOrderItem,
  UnparsedImproveProvinceOrderItem,
} from '../../shop/shop.typing';

export async function improveProvincesAction(
  data: ImproveProvincesActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country } = data;

  const provincesToImprove: ImproveProvinceOrderItem[] = [];

  for (const provinceToImprove of data.provincesToImprove) {
    const province = country.provinces.find(
      (p) => p.mapRef === provinceToImprove.mapRef
    );

    if (!province) {
      return ResponseHelper.error({
        message: 'Province not found',
        data: {
          mapRef: provinceToImprove.mapRef,
        },
      });
    }

    provincesToImprove.push({
      province,
      qty: provinceToImprove.qty,
    });
  }

  const order: ImproveProvinceOrder = {
    items: provincesToImprove,
  };

  const { totalPrice, preOrders } = ShopHelper.getProvinceImprovementPrice({
    order,
  });

  if (country.economy.balance < totalPrice) {
    return ResponseHelper.error({
      message: `Country ${country.name} does not have enough balance ($${totalPrice})`,
    });
  }

  if (totalPrice < 0) {
    return ResponseHelper.error({
      message: 'Invalid total price',
      data: { totalPrice },
    });
  }

  for (const order of preOrders) {
    const province = country.provinces.find(
      (p) => p.mapRef === order.provinceMapRef
    );

    if (!province) {
      return ResponseHelper.error({
        message: 'Province not found',
        data: {
          mapRef: order.provinceMapRef,
        },
      });
    }

    const invalidValues =
      !GeneralHelper.isNumeric(order.production.qty) ||
      !GeneralHelper.isNumeric(order.taxation.qty);

    if (invalidValues) {
      return ResponseHelper.error({
        message: 'Invalid property "qty"',
        data: { order },
      });
    }

    province.levels.production += order.production.qty || 0;
    province.levels.taxation += order.taxation.qty || 0;
  }

  country.economy.balance -= totalPrice;

  return ResponseHelper.success({
    message: 'Province(s) improved successfully',
    data: { totalPrice, preOrders },
  });
}

type ImproveProvincesActionParam = {
  provincesToImprove: UnparsedImproveProvinceOrderItem[];
  country: Country;
  game: Game;
};
