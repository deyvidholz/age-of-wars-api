import { colors } from '../data/templates/colors.template';
import { CountryPassive } from '../data/templates/country-passives.template';
import { Focus } from '../data/templates/focuses.template';
import { Personality } from '../data/templates/personalities.template';
import { countriesWorldAOWV1, CountryV1 } from '../data/v1/countries.data';
import {
  countriesV2LegacyDataSupport,
  CountryV2LegacyDataSupport,
} from '../data/v2/legacy-support/countries.data';
import { Country } from '../modules/country/country.entity';
import {
  Aggressiveness,
  Army,
  Continent,
  Economy,
  Province,
  Resource,
} from '../modules/country/country.typing';
import { GameHelper } from './game.helper';
import { GeneralHelper } from './general.helper';
import { MathHelper } from './math.helper';

export class V1CountryHelper {
  static getPreparedCountries(countriesV1: CountryV1[]) {
    const inUseColors = countriesV1
      .filter((country) => country.colour && country.colour != '#FFFFFF')
      ?.map((country) => country.colour);

    const availableColors = [
      ...colors.filter((color) => !inUseColors.includes(color)),
    ];

    const countries: Country[] = countriesV1.map((country) => {
      const aggressiveness: Aggressiveness = {
        current: country.aggressiveness || 0,
        total: country.totalAggressiveness || 0,
      };

      const economy: Economy = { balance: country.economy.money || 0 };
      const resources: Resource = { oil: country.oil || 0 };

      const personality: Personality = GameHelper.getParsedPersonality(
        country.personality
      );

      const focus: Focus = GameHelper.getRandomFocus();

      const preparedCountryName = GeneralHelper.getStringAsScreamingSnakeCase(
        country.name
      );

      const countryLegacyDataSupport: any =
        countriesV2LegacyDataSupport[preparedCountryName] || {};

      const passives: CountryPassive[] = [];

      for (const passiveV1 of country.passives || []) {
        const passive = GameHelper.getParsedCountryPassive({
          passive: passiveV1,
        });

        if (!passive) {
          continue;
        }

        passives.push(passive);
      }

      const provinces: Province[] = GameHelper.getParsedCountryProvinces({
        provinces: country.provinces,
      });

      const colorIndex = MathHelper.getRandomIndex(availableColors);
      const color = availableColors[colorIndex];

      const preparedCountry: Country = {
        army: country.army as Army,
        denonym: countryLegacyDataSupport.denonym || '', // TODO remove this "|| ''"
        isAi: true,
        name: country.name,
        tag: country.tag,
        flag: country.img,
        color,
        personality,
        focus,
        aggressiveness,
        economy,
        resources,
        passives,
        info: { continent: Continent[country.info.continent.toUpperCase()] },
        provinces,
        actions: [],
        allies: [],
        enemies: [],
        demands: [],
        guaranteeingIndependence: [],
        independenceGuaranteedBy: [],
        opinions: {},
        ...countryLegacyDataSupport,
      };

      if (country.colour && country.colour !== '#FFFFFF') {
        preparedCountry.color = country.colour;
      } else {
        availableColors.splice(colorIndex, 1);
      }

      return preparedCountry;
    });

    for (const country of countries) {
      country.opinions = GameHelper.generateOpinions({
        country,
        countries,
      });
    }

    // TODO set ID of every child object that is a CountrySimplified

    return countries;
  }
}
