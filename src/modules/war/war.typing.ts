import {
  Army,
  CountrySimplified,
  Economy,
  EstimatedArmy,
  MilitaryPower,
  ProvinceSimplified,
  Resource,
} from '../country/country.typing';

export type Losses = {
  divisions: number;
  tanks: number;
  aircrafts: number;
  warships: number;
  balance: number;
  country?: CountrySimplified;
};

export type WarParticipant = {
  id: string;
  name: string;
  flag: string;
  losses: Losses;
  participation?: number;
};

export type WarDetails = {
  attacker: {
    id: string;
    name: string;
    flag: string;
    allies: WarParticipant[];
    losses: Losses;
    participation?: number;
  };
  victim: {
    id: string;
    name: string;
    flag: string;
    allies: WarParticipant[];
    losses: Losses;
    participation?: number;
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
  winner?: WarParticipantType;
};

export type WarComparedInfo = {
  attackers: WarComparedInfoCountry[];
  victims: WarComparedInfoCountry[];
  attackersPowerDiff: MilitaryPower;
  victimsPowerDiff: MilitaryPower;
};

export type WarComparedInfoCountry = {
  country: CountrySimplified;
  militaryPower: MilitaryPower;
  powerDiffBetweenAllies: MilitaryPower;
};

export type LossesBySide = {
  attackers: Losses;
  victims: Losses;
};

export enum WarParticipantType {
  ATTACKER = 'ATTACKER',
  VICTIM = 'VICTIM',
}
