import {
  CountryPassive,
  CountryPassiveType,
  CountryPassiveValueType,
} from './country-passives.template';

export enum PersonalityType {
  AGGRESSIVE = 'Aggressive',
  NEUTRAL = 'Neutral',
  PACIFIC = 'Pacific',
}

export type Personality = {
  type: PersonalityType;
  icon: string;
  color: string;
  passives: CountryPassive[];
};

export const personalitiesConfig = {
  fileName: 'personalities.data.json',
  propertyName: 'personalities',
};

export const pacificPersonality = {
  type: PersonalityType.PACIFIC,
  color: '#2196F3',
  icon: 'mdi-charity',
  passives: [
    {
      type: CountryPassiveType.INCREASE_TARGET_AGGRESSION_WHEN_ATTACKED,
      valueType: CountryPassiveValueType.STATIC,
      value: 200,
    },
  ],
};

export const neutralPersonality = {
  type: PersonalityType.NEUTRAL,
  color: '#FDD835',
  icon: 'mdi-axis-arrow',
  passives: [],
};

export const aggressivePersonality = {
  type: PersonalityType.AGGRESSIVE,
  color: '#C62828',
  icon: 'mdi-fire',
  passives: [
    {
      type: CountryPassiveType.INCREASE_AGGRESSION_WHEN_ATTACK,
      valueType: CountryPassiveValueType.PERCENT,
      value: 30,
    },
  ],
};

export const personalities: Personality[] = [
  { ...pacificPersonality },
  { ...neutralPersonality },
  { ...aggressivePersonality },
];
