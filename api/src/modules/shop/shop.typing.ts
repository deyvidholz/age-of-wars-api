import { Province, ProvinceLevels } from '../country/country.typing';

export enum ItemType {
  DIVISIONS = 'DIVISIONS',
  TANKS = 'TANKS',
  AIRCRAFTS = 'AIRCRAFTS',
  WARSHIPS = 'WARSHIPS',
  OIL = 'OIL',
}

export enum ItemPrice {
  DIVISIONS = 375,
  TANKS = 980,
  AIRCRAFTS = 1375,
  WARSHIPS = 1215,
  OIL = 25,
}

export type Item = {
  type: ItemType;
  price: number;
  max: number;
  min: number;
};

export type Order = {
  totalPrice?: number;
  items: OrderItem[];
};

export type OrderItem = {
  itemType: ItemType;
  qty: number;
  price?: number;
  totalPrice?: number;
};

export type ImproveProvinceOrder = {
  items: ImproveProvinceOrderItem[];
};

export type UnparsedImproveProvinceOrderItem = {
  mapRef: string;
  qty: ProvinceLevels;
};

export type ImproveProvinceOrderItem = {
  province: Province;
  qty: ProvinceLevels;
  price?: number;
};

export type ImproveProvincePreOrder = {
  totalPrice?: number;
  provinceMapRef: string;
  currentLevels: {
    production: number;
    taxation: number;
  };
  currentIncoming: {
    production: number;
    taxation: number;
  };
  production: {
    qty: number;
    price: number;
    newIncomingValue: number;
  };
  taxation: {
    qty: number;
    price: number;
    newIncomingValue: number;
  };
};
