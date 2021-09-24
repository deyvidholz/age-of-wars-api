import 'dotenv/config';
import {
  CountryPassive,
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../data/templates/country-passives.template';
import { GeneralHelper } from '../../helpers/general.helper';
import { MathHelper } from '../../helpers/math.helper';
import { Country } from '../country/country.entity';
import { Province, ProvinceLevels } from '../country/country.typing';
import {
  ImproveProvinceOrder,
  ImproveProvincePreOrder,
  ItemPrice,
  ItemType,
  Order,
  OrderItem,
} from './shop.typing';

export class ShopHelper {
  static sumTotalPrice(order: Order): number {
    const finalItem = order.items.reduce(
      (previousItem: OrderItem, currentItem: OrderItem) => ({
        ...currentItem,
        price:
          previousItem.price * previousItem.qty +
          currentItem.price * currentItem.qty,
      }),
      { itemType: ItemType.DIVISIONS, qty: 0, price: 0 }
    );

    return finalItem.price;
  }

  static setTotalPrice(order: Order, passives?: CountryPassive[]): Order {
    const prices = {
      AIRCRAFTS: ItemPrice.AIRCRAFTS,
      DIVISIONS: ItemPrice.DIVISIONS,
      TANKS: ItemPrice.TANKS,
      WARSHIPS: ItemPrice.WARSHIPS,
      OIL: ItemPrice.OIL,
    };

    // Summing discount passive values
    for (const passive of passives || []) {
      switch (passive.type) {
        case CountryPassiveType.DISCOUNT_ON_AIRCRAFTS:
          prices.AIRCRAFTS = ShopHelper.applyDiscount({
            currentPrice: prices.AIRCRAFTS,
            discountType: passive.valueType,
            percentage: passive.value,
          });
          break;

        case CountryPassiveType.DISCOUNT_ON_DIVISIONS:
          prices.DIVISIONS = ShopHelper.applyDiscount({
            currentPrice: prices.DIVISIONS,
            discountType: passive.valueType,
            percentage: passive.value,
          });
          break;

        case CountryPassiveType.DISCOUNT_ON_TANKS:
          prices.TANKS = ShopHelper.applyDiscount({
            currentPrice: prices.TANKS,
            discountType: passive.valueType,
            percentage: passive.value,
          });
          break;

        case CountryPassiveType.DISCOUNT_ON_WARSHIPS:
          prices.WARSHIPS = ShopHelper.applyDiscount({
            currentPrice: prices.WARSHIPS,
            discountType: passive.valueType,
            percentage: passive.value,
          });
          break;
      }
    }

    // Applying price to order
    for (const item of order.items) {
      item.price = prices[item.itemType] || item.price;

      if (!GeneralHelper.isNumeric(item.price)) {
        throw new Error(`Item price is not numeric: ${JSON.stringify(item)}`);
      }

      item.totalPrice = item.price * item.qty;
    }

    return order;
  }

  static getTotalPrice(order: Order, passives?: CountryPassive[]): Order {
    order = ShopHelper.setTotalPrice(order, passives);
    order.totalPrice = ShopHelper.sumTotalPrice(order);
    return order;
  }

  static applyDiscount(data: ApplyDiscountParam): number {
    if (data.discountType === CountryPassiveValueType.STATIC) {
      return data.currentPrice - data.percentage;
    }

    return MathHelper.subtractByPercentage(data.currentPrice, data.percentage);
  }

  static sumTotalProvinceImprovementPrice(
    preOrder: ImproveProvincePreOrder
  ): number {
    return (
      preOrder.production.price * preOrder.production.qty +
      preOrder.taxation.price * preOrder.taxation.qty
    );
  }

  static getProvinceImprovementPrice(data: GetProvinceImprovementPriceParam): {
    totalPrice: number;
    preOrders: ImproveProvincePreOrder[];
  } {
    const unityPrices: ProvinceLevels = {
      production: +process.env.PRODUCTION_IMPROVEMENT_UNITY_PRICE,
      taxation: +process.env.TAXATION_IMPROVEMENT_UNITY_PRICE,
    };

    const preOrders: ImproveProvincePreOrder[] = [];
    let totalPrice: number = 0;

    for (const provinceOrderItem of data.order.items) {
      let productionIncomingPerLevel =
        +process.env.PRODUCTION_INCOMING_PER_LEVEL;
      let taxationIncomingPerLevel = +process.env.TAXATION_INCOMING_PER_LEVEL;

      const preOrder: ImproveProvincePreOrder = {
        provinceMapRef: provinceOrderItem.province.mapRef,
        currentLevels: {
          production: provinceOrderItem.province.levels.production,
          taxation: provinceOrderItem.province.levels.taxation,
        },
        currentIncoming: {
          production:
            provinceOrderItem.province.levels.production *
            productionIncomingPerLevel,
          taxation:
            provinceOrderItem.province.levels.taxation *
            taxationIncomingPerLevel,
        },
        production: {
          qty: 0,
          price: 0,
          newIncomingValue: 0,
        },
        taxation: {
          qty: 0,
          price: 0,
          newIncomingValue: 0,
        },
      };

      let newProductionLevel =
        provinceOrderItem.province.levels.production +
        provinceOrderItem.qty.production;

      let newTaxationLevel =
        provinceOrderItem.province.levels.taxation +
        provinceOrderItem.qty.taxation;

      preOrder.production.qty = provinceOrderItem.qty.production;
      preOrder.production.price = newProductionLevel * unityPrices.production;

      preOrder.production.newIncomingValue =
        newProductionLevel * productionIncomingPerLevel;

      preOrder.taxation.qty = provinceOrderItem.qty.taxation;
      preOrder.taxation.price = newTaxationLevel * unityPrices.taxation;

      preOrder.taxation.newIncomingValue =
        newTaxationLevel * taxationIncomingPerLevel;

      preOrder.totalPrice =
        ShopHelper.sumTotalProvinceImprovementPrice(preOrder);

      // Formatting
      preOrder.production.price = MathHelper.fixDecimals(
        preOrder.production.price
      );

      preOrder.production.newIncomingValue = MathHelper.fixDecimals(
        preOrder.production.newIncomingValue
      );

      preOrder.taxation.price = MathHelper.fixDecimals(preOrder.taxation.price);
      preOrder.taxation.newIncomingValue = MathHelper.fixDecimals(
        preOrder.taxation.newIncomingValue
      );

      totalPrice += preOrder.totalPrice;
      preOrders.push(preOrder);
    }

    return { totalPrice: MathHelper.fixDecimals(totalPrice), preOrders };
  }
}

type ApplyDiscountParam = {
  currentPrice: number;
  percentage: number;
  discountType: CountryPassiveValueType;
};

type GetProvinceImprovementPriceParam = {
  order: ImproveProvinceOrder;
};
