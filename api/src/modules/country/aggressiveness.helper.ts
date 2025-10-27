import 'dotenv/config';
import {
  CountryPassive,
  CountryPassiveType,
} from '../../data/templates/country-passives.template';
import { PersonalityType } from '../../data/templates/personalities.template';
import { Country } from './country.entity';
import { CountryHelper } from './country.helper';

export class AggressivenessHelper {
  static calculateAggressiveness(data: CalculateAggressivenessParam): number {
    switch (data.calcType) {
      case CaculateAggressivenessCalcType.DECLARE_WAR:
        return AggressivenessHelper.calculateAggressivenessDeclareWar(data);

      case CaculateAggressivenessCalcType.TAKE_PROVINCE:
        return AggressivenessHelper.calculateAggressivenessTakeProvince(data);

      default:
        return -1;
    }
  }

  static applyAggressivenessPassives(
    data: ApplyAggressivenessPassivesParam
  ): number {
    const {
      country,
      target,
      countryApplyIncrementPassiveTypes,
      countryApplyDecrementPassiveTypes,
      targetApplyPassiveTypes,
    } = data;
    let { aggressiveness } = data;

    const countryPassives: CountryPassive[] = [
      ...country.personality.passives,
      ...country.focus.passives,
      ...country.passives,
    ];

    const countryIncrementPassivesTypes = countryApplyIncrementPassiveTypes || [
      CountryPassiveType.INCREASE_AGGRESSIVENESS,
      CountryPassiveType.INCREASE_AGGRESSION_WHEN_ATTACK,
    ];

    const countryDecrementPassivesTypes = countryApplyDecrementPassiveTypes || [
      CountryPassiveType.DECREASE_AGGRESSIVENESS,
      CountryPassiveType.DECREASE_AGGRESSIVENESS_OFFENSIVE_WARS,
    ];

    const countryIncrementPassives = countryPassives.filter((passive) =>
      countryIncrementPassivesTypes.includes(passive.type)
    );
    const countryDecrementPassives = countryPassives.filter((passive) =>
      countryDecrementPassivesTypes.includes(passive.type)
    );

    // Target
    if (target) {
      const targetPassives: CountryPassive[] = [
        ...target.personality.passives,
        ...target.focus.passives,
        ...target.passives,
      ];

      const targetPassivesTypes = targetApplyPassiveTypes || [
        CountryPassiveType.INCREASE_TARGET_AGGRESSION_WHEN_ATTACKED,
      ];

      const targetRelatedPassives = targetPassives.filter((passive) =>
        targetPassivesTypes.includes(passive.type)
      );
      for (const passive of targetRelatedPassives) {
        aggressiveness = CountryHelper.applyIncrementPassive({
          percentage: passive.value,
          value: aggressiveness,
          valueIncrementType: passive.valueType,
        });
      }
    }

    for (const passive of countryIncrementPassives) {
      aggressiveness = CountryHelper.applyIncrementPassive({
        percentage: passive.value,
        value: aggressiveness,
        valueIncrementType: passive.valueType,
      });
    }

    for (const passive of countryDecrementPassives) {
      aggressiveness = CountryHelper.applyDecrementPassive({
        percentage: passive.value,
        value: aggressiveness,
        valueIncrementType: passive.valueType,
      });
    }

    return Math.ceil(aggressiveness);
  }

  static calculateAggressivenessDeclareWar(
    data: CalculateAggressivenessDeclareWarParam
  ): number {
    const { country, target } = data;

    let aggressiveness: number = 50;

    // Target
    if (target) {
      if (target.info.continent !== country.info.continent) {
        aggressiveness += 0;
      }
    }

    aggressiveness = AggressivenessHelper.applyAggressivenessPassives({
      aggressiveness,
      country,
      target,
    });

    if (country.inWarWith.length) {
      aggressiveness *= country.inWarWith.length + 1;
    }

    if (aggressiveness > 220) {
      aggressiveness = 220;
    }

    return aggressiveness;
  }

  static calculateAggressivenessTakeProvince(
    data: CalculateAggressivenessTakeProvinceParam
  ): number {
    const { country, target, isCapital } = data;
    let aggressiveness: number =
      +process.env.AGGRESSIVENESS_GAIN_PER_PROVINCE_DEMAND;

    if (isCapital) {
      aggressiveness +=
        +process.env.INCREASE_AGGRESSIVENESS_GAIN_PER_PROVINCE_DEMAND_CAPITAL;
    }

    aggressiveness = AggressivenessHelper.applyAggressivenessPassives({
      aggressiveness,
      country,
      target,
      countryApplyIncrementPassiveTypes: [
        CountryPassiveType.INCREASE_AGGRESSIVENESS,
        CountryPassiveType.INCREASE_AGGRESSION_WHEN_TAKE_PROVINCE,
      ],
      countryApplyDecrementPassiveTypes: [
        CountryPassiveType.DECREASE_AGGRESSIVENESS,
        CountryPassiveType.DECREASE_AGGRESSION_WHEN_TAKE_PROVINCE,
      ],
      targetApplyPassiveTypes: [
        CountryPassiveType.INCREASE_TARGET_AGGRESSION_WHEN_TAKE_PROVINCE,
      ],
    });

    return aggressiveness;
  }
}

export enum CaculateAggressivenessCalcType {
  DECLARE_WAR = 'DECLARE_WAR',
  TAKE_PROVINCE = 'TAKE_PROVINCE',
}

type CalculateAggressivenessParam = {
  country: Country;
  target?: Country;
  calcType: CaculateAggressivenessCalcType;
};

type ApplyAggressivenessPassivesParam = {
  aggressiveness: number;
  country: Country;
  target?: Country;
  countryApplyIncrementPassiveTypes?: CountryPassiveType[];
  countryApplyDecrementPassiveTypes?: CountryPassiveType[];
  targetApplyPassiveTypes?: CountryPassiveType[];
};

type CalculateAggressivenessDeclareWarParam = {
  country: Country;
  target?: Country;
};

type CalculateAggressivenessTakeProvinceParam = {
  country: Country;
  target?: Country;
  isCapital?: boolean;
};
