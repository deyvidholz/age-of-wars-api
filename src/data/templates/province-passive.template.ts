import { CountryPassiveValueType } from './country-passives.template';

export enum ProvincePassiveType {
  // Economic
  INCREMENT_INCOMING = 'INCREMENT_INCOMING',
  INCREMENT_OIL = 'INCREMENT_OIL',
}

export type ProvincePassive = {
  type: ProvincePassiveType;
  valueType: CountryPassiveValueType;
  value: number;
  description?: string;
  data?: any;
};
