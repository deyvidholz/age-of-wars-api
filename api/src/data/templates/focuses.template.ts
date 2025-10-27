import {
  CountryPassive,
  CountryPassiveType,
  CountryPassiveValueType,
} from './country-passives.template';

export enum FocusType {
  ECONOMY = 'ECONOMY',
  WAR = 'WAR',
  DEFENSE = 'DEFENSE',
  STRATEGY = 'STRATEGY',
}

export type Focus = {
  type: FocusType;
  icon: string;
  color: string;
  name: string;
  description?: string;
  passives: CountryPassive[];
};

export const focusesConfig = {
  fileName: 'focuses.data.json',
  propertyName: 'focuses',
};

export const economicFocus: Focus = {
  type: FocusType.ECONOMY,
  name: 'Economic',
  color: '#00E676',
  icon: 'mdi-cash',
  description: '',
  passives: [
    {
      type: CountryPassiveType.INCREASE_INCOMING,
      value: 10,
      valueType: CountryPassiveValueType.PERCENT,
      description: `Add +10% of total incoming`,
    },
  ],
};

export const warFocus: Focus = {
  type: FocusType.WAR,
  name: 'War',
  color: '#F44336',
  icon: 'mdi-pistol',
  description: '',
  passives: [
    {
      type: CountryPassiveType.INCREASE_AGGRESSIVE_WAR_MP,
      value: 7,
      valueType: CountryPassiveValueType.PERCENT,
      description: 'Add +7% of Military Power (MP) in offensive wars',
    },
    {
      type: CountryPassiveType.DECREASE_CASUALTIES,
      value: 5,
      valueType: CountryPassiveValueType.PERCENT,
      description: 'Reduce 5% of casualties in offensive wars',
    },
    {
      type: CountryPassiveType.DECREASE_AGGRESSIVENESS_OFFENSIVE_WARS,
      value: 20,
      valueType: CountryPassiveValueType.PERCENT,
      description: 'Reduce 20% of aggressiveness gain in offensive wars',
    },
  ],
};

export const defensiveFocus: Focus = {
  type: FocusType.DEFENSE,
  name: 'Defensive',
  color: '#2196F3',
  icon: 'mdi-shield',
  description: '',
  passives: [
    {
      type: CountryPassiveType.INCREASE_DEFENSIVE_WAR_MP,
      value: 15,
      valueType: CountryPassiveValueType.PERCENT,
      description: 'Add +15% Military Power on defensive wars',
    },
    {
      type: CountryPassiveType.DECREASE_CASUALTIES_DEFENSIVE_WARS,
      value: 15,
      valueType: CountryPassiveValueType.PERCENT,
      description: 'Reduce 15% of casualties on defensive wars',
    },
  ],
};

export const strategicFocus: Focus = {
  type: FocusType.STRATEGY,
  name: 'Strategic',
  color: '#FF9800',
  icon: 'mdi-lightbulb',
  description: '',
  passives: [
    {
      description: 'Add +3% military power',
      type: CountryPassiveType.INCREASE_MP,
      value: 3,
      valueType: CountryPassiveValueType.PERCENT,
    },
    {
      description: 'Reduce 20% of casualties',
      type: CountryPassiveType.DECREASE_CASUALTIES,
      value: 20,
      valueType: CountryPassiveValueType.PERCENT,
    },
  ],
};

export const focuses: Focus[] = [
  { ...economicFocus },
  { ...warFocus },
  { ...defensiveFocus },
  { ...strategicFocus },
];
