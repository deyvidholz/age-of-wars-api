export enum ItemType {
  DIVISIONS,
  TANKS,
  AIRCRAFTS,
  WARSHIPS,
  OIL,
}

export enum ItemPrice {
  DIVISIONS = 375,
  TANKS = 980,
  AIRCRAFTS = 1375,
  WARSHIPS = 1215,
  OIL = 975,
}

export type Item = {
  type: ItemType;
  price: number;
  max: number;
  min: number;
};

export type Order = {
  item: Item;
  qty: number;
};

export const divisionsItem: Item = {
  type: ItemType.DIVISIONS,
  price: ItemPrice.DIVISIONS,
  max: 50,
  min: 10,
};

export const tanksItem: Item = {
  type: ItemType.TANKS,
  price: ItemPrice.TANKS,
  max: 50,
  min: 1,
};

export const aircraftsItem: Item = {
  type: ItemType.AIRCRAFTS,
  price: ItemPrice.AIRCRAFTS,
  max: 50,
  min: 1,
};

export const warshipsItem: Item = {
  type: ItemType.WARSHIPS,
  price: ItemPrice.WARSHIPS,
  max: 50,
  min: 1,
};

export const oilItem: Item = {
  type: ItemType.OIL,
  price: ItemPrice.OIL,
  max: 1000,
  min: 50,
};

export const items: Item[] = [
  { ...divisionsItem },
  { ...tanksItem },
  { ...aircraftsItem },
  { ...warshipsItem },
  { ...oilItem },
];
