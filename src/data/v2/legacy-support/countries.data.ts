import { V1CountryHelper } from '../../../helpers/v1-countries.helper';
import {
  CountrySimplified,
  Opinions,
  OpinionsAfterGenerate,
} from '../../../modules/country/country.typing';
import { CountryPassive } from '../../templates/country-passives.template';
import {
  aggressivePersonality,
  pacificPersonality,
  Personality,
} from '../../templates/personalities.template';
import { countriesWorldAOWV1 } from '../../v1/countries.data';

export type CountryV2LegacyDataSupport = {
  [key: string]: {
    denonym: string;
    personality?: Personality;
    passives?: CountryPassive[];
    allies?: CountrySimplified[];
    enemies?: CountrySimplified[];
    guaranteeingIndependence?: CountrySimplified[];
    independenceGuaranteedBy?: CountrySimplified[];
    opinions?: OpinionsAfterGenerate;
  };
};

// TODO add denonym for each country
export const countriesV2LegacyDataSupport: CountryV2LegacyDataSupport = {
  UNITED_STATES: {
    denonym: 'Americans',
    personality: aggressivePersonality,
    allies: [
      {
        flag: getFlag('Japan'),
        name: 'Japan',
      },
    ],
    enemies: [
      {
        flag: getFlag('China'),
        name: 'China',
      },
    ],
    opinions: {
      Canada: {
        flag: getFlag('Canada'),
        name: 'Canada',
        value: 200,
      },
      Japan: {
        flag: getFlag('Japan'),
        name: 'Japan',
        value: 200,
      },
    },
  },
  JAPAN: {
    denonym: 'Japaneses',
    personality: pacificPersonality,
    allies: [
      {
        flag: getFlag('United States'),
        name: 'United States',
      },
    ],
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: 200,
      },
    },
  },
};

function getFlag(countryName: string): string {
  return countriesWorldAOWV1.find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  )?.img;
}
