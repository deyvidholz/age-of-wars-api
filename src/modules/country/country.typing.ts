import { ProvincePassive } from '../../data/templates/province-passive.template';

export type Army = {
  aircrafts: number;
  divisions: number;
  tanks: number;
  warships: number;
};

export type EstimatedArmy = {
  aircrafts: number;
  divisions: number;
  tanks: number;
  warships: number;
};

export type MilitaryPower = {
  total: number;
  aircrafts: number;
  divisions: number;
  tanks: number;
  warships: number;
  countryName?: string;
  percentage?: number;
};

export type Aggressiveness = {
  current: number;
  total: number;
};

export type Economy = {
  balance: number;
};

export type Production = {
  oil: number;
};

export type Resource = {
  oil: number;
};

export enum Continent {
  NORTH_AMERICA = 'NORTH_AMERICA',
  SOUTH_AMERICA = 'SOUTH_AMERICA',
  EUROPE = 'EUROPE',
  AFRICA = 'AFRICA',
  ASIA = 'ASIA',
  OCEANIA = 'OCEANIA',
}

export type CountryInfo = {
  continent: Continent;
};

export type CountrySimplified = {
  id?: string;
  flag: string;
  name: string;
};

export type Incoming = Economy & Resource & { name?: string };

export type ProvinceIncoming = Incoming & ProvinceLevels & { mapRef?: string };

export type ProvinceLevels = {
  production: number;
  taxation: number;
};

export type Province = {
  owner?: string;
  img: string;
  mapRef: string;
  name: string;
  description?: string;
  isCapital: boolean;
  levels: ProvinceLevels;
  incoming?: Incoming;
  oilProduction: number;
  passives: ProvincePassive[];
  isIsland: boolean;
  hasCoast: boolean;
};

export type ProvinceSimplified = {
  mapRef: string;
  name?: string;
};

export type ProvinceToImprove = {
  mapRef: string;
  name?: string;
  levels: ProvinceLevels;
};

export type Opinions = {
  [key: string]: Opinion;
};

export type Opinion = {
  id?: string;
  flag: string;
  name: string;
  value: number;
};

export type OpinionsAfterGenerate = {
  [key: string]: CountrySimplified & { value: number[] | number };
};

export type Message = {
  icon?: string;
  color?: string;
  title?: string;
  description: string;
  data?: any;
};

export enum SetOpinionOfActionParam {
  SUM = 'SUM',
  SUBTRACT = 'SUBTRACT',
  SET = 'SET',
}

export enum DecisionType {
  ACCEPT_JOIN_WAR = 'ACCEPT_JOIN_WAR',
  REFUSE_JOIN_WAR = 'REFUSE_JOIN_WAR',
  ACCEPT_PEACE_REQUEST = 'ACCEPT_PEACE_REQUEST',
  REFUSE_PEACE_REQUEST = 'REFUSE_PEACE_REQUEST',
  ACCEPT_ALLY_REQUEST = 'ACCEPT_ALLY_REQUEST',
  REFUSE_ALLY_REQUEST = 'REFUSE_ALLY_REQUEST',
}

export type Decision = {
  id: string;
  types: DecisionType[];
  requester?: CountrySimplified;
  target?: CountrySimplified;
  data?: any;
};
