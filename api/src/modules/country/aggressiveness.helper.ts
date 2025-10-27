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

    // IMPROVEMENT: Consider target characteristics
    if (target) {
      // Cross-continental wars are seen as more aggressive (expansion beyond borders)
      if (target.info.continent !== country.info.continent) {
        aggressiveness += 15;
      }

      // Declaring war on smaller/weaker nations is less aggressive
      const targetMP = target.militaryPower?.total || 0;
      const ownMP = country.militaryPower?.total || 0;

      if (ownMP > 0 && targetMP > 0) {
        const powerRatio = targetMP / ownMP;

        if (powerRatio > 1.5) {
          // Attacking stronger nation (defensive/bold move)
          aggressiveness += 25;
        } else if (powerRatio < 0.5) {
          // Bullying weaker nation (opportunistic)
          aggressiveness += 10;
        }
      }

      // Attacking allied/friendly nations is more aggressive
      if (country.isAlliedWith(target.id)) {
        aggressiveness += 40; // Backstabbing
      }

      const opinion = country.getOpinionOf(target.name);
      if (opinion && opinion.value > 0) {
        // Attacking nations you have positive relations with
        aggressiveness += Math.min(30, Math.floor(opinion.value / 10));
      }
    }

    // Apply personality/focus passives
    aggressiveness = AggressivenessHelper.applyAggressivenessPassives({
      aggressiveness,
      country,
      target,
    });

    // IMPROVEMENT: Multiple wars increase aggressiveness additively, not multiplicatively
    // This prevents exponential growth that made values unpredictable
    if (country.inWarWith.length > 0) {
      // Each additional war adds aggressiveness (warmongering)
      const additionalWars = country.inWarWith.length;
      aggressiveness += additionalWars * 30; // +30 per war
    }

    // IMPROVEMENT: Pacific personalities have reduced aggressiveness
    if (country.personality.type === PersonalityType.PACIFIC) {
      aggressiveness = Math.floor(aggressiveness * 0.6); // 40% reduction
    }

    // IMPROVEMENT: Dynamic cap based on personality and current wars
    let maxAggressiveness = 220;

    if (country.personality.type === PersonalityType.AGGRESSIVE) {
      maxAggressiveness = 300; // Aggressive countries can go higher
    } else if (country.personality.type === PersonalityType.PACIFIC) {
      maxAggressiveness = 150; // Pacific countries capped lower
    }

    // Countries at war can accumulate more aggressiveness
    if (country.inWarWith.length >= 2) {
      maxAggressiveness += 50; // Allow higher for warmongers
    }

    aggressiveness = Math.min(aggressiveness, maxAggressiveness);

    return Math.ceil(aggressiveness);
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
