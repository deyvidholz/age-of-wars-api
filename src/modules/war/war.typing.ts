import {
  Army,
  Economy,
  EstimatedArmy,
  ProvinceSimplified,
  Resource,
} from '../country/country.typing';

export type Losses = {
  divisions: number;
  tanks: number;
  aircrafts: number;
  warships: number;
  balance: number;
};

export type WarParticipant = {
  id: string;
  name: string;
  flag: string;
  losses: Losses;
};

export type WarDetails = {
  attacker: {
    id: string;
    name: string;
    flag: string;
    allies: WarParticipant[];
    losses: Losses;
  };
  victim: {
    id: string;
    name: string;
    flag: string;
    allies: WarParticipant[];
    losses: Losses;
  };
};

export type WarMessage = {
  title: string;
  message: string;
  icon: string;
  iconColor: string;
};

export enum PeaceRequestType {
  OFFER = 'OFFER',
  DEMAND = 'DEMAND',
}

export type PeaceRequest = {
  offers?: Offer[];
  demands?: Demand[];
};

export type Offer = {
  peaceRequestType: PeaceRequestType;
  type: OfferType;
  economy?: Economy;
  resources: Resource;
  provinces: ProvinceSimplified[];
};

export type Demand = {
  peaceRequestType: PeaceRequestType;
  type: DemandType;
  economy?: Economy;
  resources: Resource;
  provinces: ProvinceSimplified[];
};

export enum OfferType {
  PROVINCE = 'PROVINCE',
  BALANCE = 'BALANCE',
  OIL = 'OIL',
}

export enum DemandType {
  PROVINCE = 'PROVINCE',
  BALANCE = 'BALANCE',
  OIL = 'OIL',
}

export enum WarStage {
  PREPARING = 'PREPARING',
  FIGHTING = 'FIGHTING',
  OVER = 'OVER',
}

export type War = {
  id: string;
  gameId: string;
  stage: WarStage;
  startAtStage: number;
  details: WarDetails;
};
