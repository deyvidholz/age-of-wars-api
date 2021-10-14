import { CountryPassiveValueType } from './country-passives.template';

export enum ProvincePassiveType {
  // Economic
  INCREMENT_INCOMING = 'INCREMENT_INCOMING',
  INCREMENT_OIL = 'INCREMENT_OIL',
  INCREMENT_PRODUCTION_INCOMING = 'INCREMENT_PRODUCTION_INCOMING',
  INCREMENT_TAXATION_INCOMING = 'INCREMENT_TAXATION_INCOMING',
  REDUCE_INCOMING = 'REDUCE_INCOMING',
}

export type ProvincePassive = {
  type: ProvincePassiveType;
  valueType: CountryPassiveValueType;
  value: number;
  description?: string;
  data?: any;
  setAsCountryPassive?: boolean;
  duration?: number;
};
