import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../../helpers/response.helper';
import { Country } from '../../country/country.entity';
import { Game } from '../../game/game.entity';
import { ShopHelper } from '../../shop/shop.helper';
import { ShopService } from '../../shop/shop.service';
import { Order } from '../../shop/shop.typing';

export async function shopAction(
  data: ShopActionParam
): Promise<SuccessResponse | ErrorResponse> {
  const { game, country } = data;

  return ShopService.buy({
    country,
    order: data.order,
  });
}

type ShopActionParam = {
  order: Order;
  country: Country;
  game: Game;
};
