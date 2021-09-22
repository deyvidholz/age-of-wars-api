import {
  Army,
  Economy,
  EstimatedArmy,
  ProvinceSimplified,
} from '../country/country.typing';

export type WarDetails = {
  attacker: {
    name: string;
    flag: string;
    allies?: WarParticipant[];
    militaryPower: any[];
    losses: any[];
  };
  victim: {
    name: string;
    flag: string;
    allies?: WarParticipant[];
    militaryPower: any[];
    losses: any[];
  };
};

export type WarMessage = {
  title: string;
  message: string;
  icon: string;
  iconColor: string;
};

export type WarParticipant = {
  id: string;
  flag: string;
  name: string;
  army: Army;
  estimatedArmy: EstimatedArmy;
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
