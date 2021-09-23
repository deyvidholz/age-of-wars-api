import {
  Army,
  Economy,
  EstimatedArmy,
  ProvinceSimplified,
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

export type Demand = {
  type: DemandType;
  economy?: Economy;
  provinces: ProvinceSimplified[];
  isOffer?: boolean;
};

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
