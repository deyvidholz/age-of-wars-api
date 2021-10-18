import 'dotenv/config';
import {
  CountryPassive,
  CountryPassiveType,
  CountryPassiveValueType,
} from '../data/templates/country-passives.template';
import { Focus, focuses } from '../data/templates/focuses.template';
import {
  personalities,
  Personality,
  PersonalityType,
} from '../data/templates/personalities.template';
import {
  ProvincePassive,
  ProvincePassiveType,
} from '../data/templates/province-passive.template';
import {
  CountryPassiveV1,
  CountryPersonalityV1,
  CountryProvincePassiveV1,
  CountryProvinceV1,
} from '../data/v1/countries.data';
import { Country } from '../modules/country/country.entity';
import {
  Army,
  CountrySimplified,
  EstimatedArmy,
  Opinions,
  Province,
} from '../modules/country/country.typing';
import { MathHelper } from './math.helper';

export class GameHelper {
  static getRandomPersonality(): Personality {
    return MathHelper.getRandomItem(personalities) as Personality;
  }

  static getRandomFocus(): Focus {
    return MathHelper.getRandomItem(focuses) as Focus;
  }

  static generateOpinions(data: GenerateOpinionsParam): Opinions {
    if (!data.exclude) {
      data.exclude = [data.country.name];
    } else {
      data.exclude.push(data.country.name);
    }

    const opinions: Opinions = {};
    const countries = data.countries.filter(
      (country) => !data.exclude.includes(country.name)
    );

    for (const targetCountry of countries) {
      const preDefinedValue = data.country.opinions[targetCountry.name];
      let value = preDefinedValue ? preDefinedValue.value : null;

      if (value && typeof value === 'object') {
        value = MathHelper.getRandomNumber(value[0], value[1]);
      }

      if (!value) {
        let minNegativeValue = -200;
        let maxPositiveValue = 200;

        if (data.country.info.continent === targetCountry.info.continent) {
          minNegativeValue += 25;
        }

        if (targetCountry.personality.type === PersonalityType.PACIFIC) {
          if (data.country.personality.type === PersonalityType.PACIFIC) {
            minNegativeValue += 75;
          } else {
            minNegativeValue += 10;
          }
        }

        value = MathHelper.getRandomNumber(minNegativeValue, maxPositiveValue);
      }

      if (value < -200) {
        value = -200;
      }

      if (value > 200) {
        value = 200;
      }

      opinions[targetCountry.name] = {
        flag: targetCountry.flag,
        id: targetCountry.id,
        name: targetCountry.name,
        value,
      };
    }

    return opinions;
  }

  static getSimplifiedCountry(
    data: GetSimplifiedCountryParam
  ): CountrySimplified {
    return {
      flag: data.country.flag,
      id: data.country.id,
      name: data.country.name,
    };
  }

  static getParsedPersonality(
    personalityV1: CountryPersonalityV1
  ): Personality {
    // Possibly undefined
    if (!personalityV1) {
      return this.getRandomPersonality();
    }

    return (
      personalities.find(
        (personality) =>
          personality.type.toLowerCase() === personalityV1.toLowerCase()
      ) || this.getRandomPersonality()
    );
  }

  static getParsedCountryPassive(
    data: GetParsedCountryPassiveParam
  ): CountryPassive | null {
    const passiveType = CountryPassiveType[data.passive.type];

    const passiveValueType =
      passiveType === CountryPassiveType.INCREASE_INCOMING
        ? CountryPassiveValueType.STATIC
        : CountryPassiveValueType.PERCENT;

    if (!passiveType) {
      return null;
    }

    // TODO description replaces
    let description = '';

    if (passiveValueType === 'STATIC') {
      description += `${data.passive.amount} {${passiveType}}`;
    } else {
      description += `${data.passive.amount}% {${passiveType}}`;
    }

    if (data.passive.amount >= 0) {
      description = `+${description}`;
    }

    return {
      type: passiveType,
      value: data.passive.amount,
      valueType: passiveValueType,
      description,
    };
  }

  static getParsedCountryProvinces(
    data: GetParsedCountryProvinces
  ): Province[] {
    return data.provinces.map((province: CountryProvinceV1) => {
      let passives: ProvincePassive[] = [];

      for (const passiveV1 of province.passives || []) {
        const passive = GameHelper.getParsedCountryProvincePassive({
          passive: passiveV1,
        });

        if (!passive) {
          continue;
        }

        passives.push(passive);
      }

      return {
        hasCoast: province.hasCoast || false,
        img: province.img,
        isCapital: province.capital || false,
        isIsland: province.isIsland || province.isIslands || false,
        levels: {
          production: province.development.production,
          taxation: province.development.taxation,
        },
        mapRef: province.id,
        name: province.name,
        oilProduction: province.oilProduction || 0,
        passives,
        description: province.description || null,
        incoming: {},
      } as Province;
    });
  }

  static getParsedCountryProvincePassive(
    data: GetParsedCountryProvincePassiveParam
  ): ProvincePassive | null {
    // Legacy province data has only one type of passive
    const availableTypes = {
      increase_incoming: 'INCREMENT_INCOMING',
    };

    if (!availableTypes[data.passive.type]) {
      return null;
    }

    const passiveType = availableTypes[data.passive.type];

    return {
      type: ProvincePassiveType[passiveType],
      value: data.passive.amount,
      valueType: CountryPassiveValueType.PERCENT,
      description:
        passiveType === ProvincePassiveType.INCREMENT_INCOMING
          ? `Add +${data.passive.amount}% incoming`
          : '',
    };
  }

  static canChangeFocus(stageCount: number): boolean {
    const restOfDivision =
      stageCount % +process.env.ALLOW_CHANGE_FOCUS_EVERY_STAGE;
    return stageCount < 3 || [0, 1].includes(restOfDivision);
  }
}

type GenerateOpinionsParam = {
  country: Country;
  countries: Country[];
  exclude?: string[];
};

type ArmyParam = { army: Army };

type GetSimplifiedCountryParam = {
  country: Country;
};

type GetParsedCountryPassiveParam = {
  passive: CountryPassiveV1;
};

type GetParsedCountryProvinces = {
  provinces: CountryProvinceV1[];
};

type GetParsedCountryProvincePassiveParam = {
  passive: CountryProvincePassiveV1;
};
