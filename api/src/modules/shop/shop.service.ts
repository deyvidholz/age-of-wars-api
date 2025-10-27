import {
  ErrorResponse,
  ResponseHelper,
  SuccessResponse,
} from '../../helpers/response.helper';
import { Country } from '../country/country.entity';
import { countryRepository } from '../country/country.repository';
import { ShopHelper } from './shop.helper';
import {
  ImproveProvinceOrder,
  Item,
  ItemType,
  Order,
  OrderItem,
  UnparsedImproveProvinceOrderItem,
} from './shop.typing';

export class ShopService {
  static async buy(data: OrderParam): Promise<SuccessResponse | ErrorResponse> {
    data.order.items = data.order.items.map((item) => ({
      ...item,
      qty: Number(item.qty),
    }));

    const country =
      data.country || (await countryRepository().findOne(data.countryId));

    if (!country) {
      return ResponseHelper.success({
        message: 'Country not found',
      });
    }

    let order = ShopHelper.getTotalPrice(data.order, country.passives);
    let price = order.totalPrice;

    if (price < 0) {
      price = 0;
    }

    if (country.economy.balance < price) {
      return ResponseHelper.success({
        message: `Country does not have enough balance (${price})`,
      });
    }

    // Delivering items
    for (const item of data.order.items) {
      switch (item.itemType) {
        case ItemType.AIRCRAFTS:
          country.army.aircrafts += item.qty;
          break;
        case ItemType.DIVISIONS:
          country.army.divisions += item.qty;
          break;
        case ItemType.OIL:
          country.resources.oil += item.qty;
          break;
        case ItemType.TANKS:
          country.army.tanks += item.qty;
          break;
        case ItemType.WARSHIPS:
          country.army.warships += item.qty;
          break;
      }
    }

    country.economy.balance -= price;
    country.updateEstimatedArmy();
    await countryRepository().save(country);

    return ResponseHelper.success({
      data: country,
    });
  }

  static async getOrderPrice(
    data: GetPriceParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const country =
      data.country || (await countryRepository().findOne(data.countryId));

    if (!country) {
      return ResponseHelper.success({
        message: 'Country not found',
      });
    }

    // Creating fake order to get price
    let order: Order = { items: data.items } as unknown as Order;
    order = ShopHelper.getTotalPrice(order, country.passives);

    return ResponseHelper.success({
      data: order,
    });
  }

  static async getProvincesImprovementPrice(
    data: GetProvincesImprovementPriceParam
  ): Promise<SuccessResponse | ErrorResponse> {
    const country =
      data.country || (await countryRepository().findOne(data.countryId));

    if (!country) {
      return ResponseHelper.success({
        message: 'Country not found',
      });
    }

    if (data.playerId && country.owner.id !== data.playerId) {
      return ResponseHelper.success({
        message: 'You cannot buy items to a country that you are not the owner',
      });
    }

    let provincesNotFound: UnparsedImproveProvinceOrderItem[] = [];

    // Creating fake order to get improvement prices
    const order: ImproveProvinceOrder = {
      items: data.provincesToImprove.map((provinceToImprove) => {
        const province = country.provinces.find(
          (p) =>
            p.mapRef.toLowerCase() === provinceToImprove.mapRef.toLowerCase()
        );

        if (!province) {
          provincesNotFound.push(provinceToImprove);
        }

        return {
          province,
          qty: provinceToImprove.qty,
        };
      }),
    };

    if (provincesNotFound.length) {
      return ResponseHelper.error({
        message: 'Province not found',
        data: provincesNotFound,
      });
    }

    const preOrder = ShopHelper.getProvinceImprovementPrice({
      order,
    });

    return ResponseHelper.success({
      data: preOrder,
    });
  }
}

type OrderParam = {
  playerId?: string;
  countryId?: string;
  country?: Country;
  order: Order;
};

type GetPriceParam = {
  playerId?: string;
  countryId?: string;
  country?: Country;
  items: OrderItem[];
};

type GetProvincesImprovementPriceParam = {
  playerId?: string;
  countryId: string;
  country?: Country;
  provincesToImprove: UnparsedImproveProvinceOrderItem[];
};
