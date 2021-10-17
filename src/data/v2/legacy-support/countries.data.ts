import { V1CountryHelper } from '../../../helpers/v1-countries.helper';
import {
  CountrySimplified,
  Opinions,
  OpinionsAfterGenerate,
} from '../../../modules/country/country.typing';
import {
  CountryPassive,
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../templates/country-passives.template';
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
    guaranteeingIndependence: [
      {
        flag: getFlag('Canada'),
        name: 'Canada',
      },
      {
        flag: getFlag('Philippines'),
        name: 'Philippines',
      },
      {
        flag: getFlag('Taiwan'),
        name: 'Taiwan',
      },
      {
        flag: getFlag('South Korea'),
        name: 'South Korea',
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
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: -200,
      },
      'North Korea': {
        flag: getFlag('North Korea'),
        name: 'North Korea',
        value: -200,
      },
      Venezuela: {
        flag: getFlag('Venezuela'),
        name: 'Venezuela',
        value: [-180, -160],
      },
      Turkey: {
        flag: getFlag('Turkey'),
        name: 'Turkey',
        value: [-130, -80],
      },
      Syria: {
        flag: getFlag('Syria'),
        name: 'Syria',
        value: [-200, -180],
      },
      Iraq: {
        flag: getFlag('Iraq'),
        name: 'Iraq',
        value: [-200, -180],
      },
      Iran: {
        flag: getFlag('Iran'),
        name: 'Iran',
        value: [-175, -140],
      },
      Qatar: {
        flag: getFlag('Qatar'),
        name: 'Qatar',
        value: [-150, -130],
      },
      Libya: {
        flag: getFlag('Libya'),
        name: 'Libya',
        value: [-150, -130],
      },
      Kuwait: {
        flag: getFlag('Kuwait'),
        name: 'Kuwait',
        value: [-200, -180],
      },
      Afghanistan: {
        flag: getFlag('Afghanistan'),
        name: 'Afghanistan',
        value: [-200, -180],
      },
      Taiwan: {
        flag: getFlag('Taiwan'),
        name: 'Taiwan',
        value: [100, 180],
      },
      Philippines: {
        flag: getFlag('Philippines'),
        name: 'Philippines',
        value: [100, 180],
      },
      'United Kingdom': {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
        value: [100, 180],
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
      'North Korea': {
        flag: getFlag('North Korea'),
        name: 'North Korea',
        value: [-180, -170],
      },
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: [-200, -185],
      },
      Australia: {
        flag: getFlag('Australia'),
        name: 'Australia',
        value: [190, 200],
      },
    },
  },
  CANADA: {
    denonym: 'Canadians',
    independenceGuaranteedBy: [
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
      'United Kingdom': {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
        value: 200,
      },
      Australia: {
        flag: getFlag('Australia'),
        name: 'Australia',
        value: 200,
      },
      'New Zealand': {
        flag: getFlag('New Zealand'),
        name: 'New Zealand',
        value: 200,
      },
    },
  },
  RUSSIA: {
    denonym: 'Russian',
    personality: aggressivePersonality,
    guaranteeingIndependence: [
      {
        flag: getFlag('Ukraine'),
        name: 'Ukraine',
      },
    ],
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: [150, 200],
      },
      Azerbaijan: {
        flag: getFlag('Azerbaijan'),
        name: 'Azerbaijan',
        value: -200,
      },
      Georgia: {
        flag: getFlag('Georgia'),
        name: 'Georgia',
        value: -200,
      },
      Armenia: {
        flag: getFlag('Armenia'),
        name: 'Armenia',
        value: -200,
      },
      Ukraine: {
        flag: getFlag('Ukraine'),
        name: 'Ukraine',
        value: -200,
      },
      Poland: {
        flag: getFlag('Poland'),
        name: 'Poland',
        value: [-190, -165],
      },
    },
  },
  UKRAINE: {
    denonym: 'Ukranian',
    independenceGuaranteedBy: [
      {
        flag: getFlag('Russia'),
        name: 'Russia',
      },
    ],
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
    },
  },
  SPAIN: {
    denonym: 'Spanish',
    opinions: {
      Portugal: {
        flag: getFlag('Portugal'),
        name: 'Portugal',
        value: [130, 200],
      },
      France: {
        flag: getFlag('France'),
        name: 'France',
        value: [130, 200],
      },
      Argentina: {
        flag: getFlag('Argentina'),
        name: 'Argentina',
        value: [130, 200],
      },
      Mexico: {
        flag: getFlag('Mexico'),
        name: 'Mexico',
        value: [130, 200],
      },
    },
  },
  AUSTRIA: {
    denonym: 'Austrian',
    opinions: {
      Germany: {
        flag: getFlag('Germany'),
        name: 'Germany',
        value: 200,
      },
      Hungary: {
        flag: getFlag('Hungary'),
        name: 'Hungary',
        value: [160, 200],
      },
    },
  },
  GERMANY: {
    denonym: 'German',
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
    },
  },
  POLAND: {
    denonym: 'Polish',
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
    },
  },
  LITHUANIA: {
    denonym: 'Lithuanian',
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
    },
  },
  LATVIA: {
    denonym: 'Latvian',
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
      Sweden: {
        flag: getFlag('Sweden'),
        name: 'Sweden',
        value: 200,
      },
    },
  },
  FINLAND: {
    denonym: 'Finnish',
    personality: pacificPersonality,
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
      Sweden: {
        flag: getFlag('Sweden'),
        name: 'Sweden',
        value: [120, 200],
      },
      Denmark: {
        flag: getFlag('Denmark'),
        name: 'Denmark',
        value: [120, 200],
      },
      Norway: {
        flag: getFlag('Norway'),
        name: 'Norway',
        value: [120, 200],
      },
      Lithuania: {
        flag: getFlag('Lithuania'),
        name: 'Lithuania',
        value: [120, 200],
      },
      Estonia: {
        flag: getFlag('Estonia'),
        name: 'Estonia',
        value: [120, 200],
      },
      Latvia: {
        flag: getFlag('Latvia'),
        name: 'Latvia',
        value: [120, 200],
      },
    },
  },
  PHILIPPINES: {
    denonym: 'Filipino',
    personality: pacificPersonality,
    independenceGuaranteedBy: [
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
  UNITED_KINGDOM: {
    denonym: 'English',
    guaranteeingIndependence: [
      {
        flag: getFlag('Ireland'),
        name: 'Ireland',
      },
    ],
    allies: [
      {
        flag: getFlag('Portugal'),
        name: 'Portugal',
      },
    ],
    opinions: {
      Portugal: {
        flag: getFlag('Portugal'),
        name: 'Portugal',
        value: [170, 200],
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: [140, 200],
      },
      Ireland: {
        flag: getFlag('Ireland'),
        name: 'Ireland',
        value: 200,
      },
      Belgium: {
        flag: getFlag('Belgium'),
        name: 'Belgium',
        value: [170, 200],
      },
      France: {
        flag: getFlag('France'),
        name: 'France',
        value: [170, 200],
      },
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: [-130, 30],
      },
      Argentina: {
        flag: getFlag('Argentina'),
        name: 'Argentina',
        value: [-170, -145],
      },
      Canada: {
        flag: getFlag('Canada'),
        name: 'Canada',
        value: [180, 200],
      },
      Australia: {
        flag: getFlag('Australia'),
        name: 'Australia',
        value: [180, 200],
      },
      'New Zealand': {
        flag: getFlag('New Zealand'),
        name: 'New Zealand',
        value: [180, 200],
      },
    },
  },
  PORTUGAL: {
    denonym: 'Portugueses',
    allies: [
      {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
      },
    ],
    passives: [
      {
        type: CountryPassiveType.INCREASE_DEFENSIVE_WAR_MP,
        valueType: CountryPassiveValueType.PERCENT,
        value: 10,
        description: `Add +10% of Military Power on defensive wars`,
      },
    ],
    opinions: {
      'United Kingdom': {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
        value: [180, 200],
      },
      Brazil: {
        flag: getFlag('Brazil'),
        name: 'Brazil',
        value: [175, 200],
      },
    },
  },
  IRELAND: {
    denonym: 'Irish',
    independenceGuaranteedBy: [
      {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
      },
    ],
  },
  SWEDEN: {
    denonym: 'Swedish',
    personality: pacificPersonality,
    opinions: {
      Denmark: {
        flag: getFlag('Denmark'),
        name: 'Denmark',
        value: [180, 200],
      },
      Norway: {
        flag: getFlag('Norway'),
        name: 'Norway',
        value: [180, 200],
      },
      Lithuania: {
        flag: getFlag('Lithuania'),
        name: 'Lithuania',
        value: [180, 200],
      },
      Estonia: {
        flag: getFlag('Estonia'),
        name: 'Estonia',
        value: [180, 200],
      },
      Latvia: {
        flag: getFlag('Latvia'),
        name: 'Latvia',
        value: [180, 200],
      },
    },
  },
  SWITZERLAND: {
    denonym: 'Swiss',
    personality: pacificPersonality,
  },
  LUXEMBOURG: {
    denonym: 'Luxembourger',
    personality: pacificPersonality,
  },
  ESTONIA: {
    denonym: 'Estonian',
    personality: pacificPersonality,
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
      Denmark: {
        flag: getFlag('Denmark'),
        name: 'Denmark',
        value: 200,
      },
    },
  },
  NORWAY: {
    denonym: 'Norwegian',
    personality: pacificPersonality,
    opinions: {
      Sweden: {
        flag: getFlag('Sweden'),
        name: 'Sweden',
        value: [180, 200],
      },
      Denmark: {
        flag: getFlag('Denmark'),
        name: 'Denmark',
        value: [180, 200],
      },
      Lithuania: {
        flag: getFlag('Lithuania'),
        name: 'Lithuania',
        value: [180, 200],
      },
      Estonia: {
        flag: getFlag('Estonia'),
        name: 'Estonia',
        value: [180, 200],
      },
      Latvia: {
        flag: getFlag('Latvia'),
        name: 'Latvia',
        value: [180, 200],
      },
    },
  },
  THE_NETHERLANDS: {
    denonym: 'Dutch',
    personality: pacificPersonality,
  },
  BELGIUM: {
    denonym: 'Belgian',
    personality: pacificPersonality,
  },
  DENMARK: {
    denonym: 'Danes',
    personality: pacificPersonality,
    opinions: {
      Sweden: {
        flag: getFlag('Sweden'),
        name: 'Sweden',
        value: [180, 200],
      },
      Norway: {
        flag: getFlag('Norway'),
        name: 'Norway',
        value: [180, 200],
      },
      Lithuania: {
        flag: getFlag('Lithuania'),
        name: 'Lithuania',
        value: [180, 200],
      },
      Estonia: {
        flag: getFlag('Estonia'),
        name: 'Estonia',
        value: [180, 200],
      },
      Latvia: {
        flag: getFlag('Latvia'),
        name: 'Latvia',
        value: [180, 200],
      },
    },
  },
  TAIWAN: {
    denonym: 'Taiwanese',
    independenceGuaranteedBy: [
      {
        flag: getFlag('United States'),
        name: 'United States',
      },
    ],
  },
  SOUTH_KOREA: {
    denonym: 'Korean',
    independenceGuaranteedBy: [
      {
        flag: getFlag('United States'),
        name: 'United States',
      },
    ],
    opinions: {
      'North Korea': {
        flag: getFlag('North Korea'),
        name: 'North Korea',
        value: -200,
      },
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: -200,
      },
      Japan: {
        flag: getFlag('Japan'),
        name: 'Japan',
        value: [130, 200],
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: [185, 200],
      },
    },
  },
  CHINA: {
    denonym: 'Chineses',
    guaranteeingIndependence: [
      {
        flag: getFlag('North Korea'),
        name: 'North Korea',
      },
    ],
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
      Japan: {
        flag: getFlag('Japan'),
        name: 'Japan',
        value: [-200, -185],
      },
      'South Korea': {
        flag: getFlag('South Korea'),
        name: 'South Korea',
        value: [-200, -185],
      },
      Greece: {
        flag: getFlag('Greece'),
        name: 'Greece',
        value: [180, 200],
      },
      Venezuela: {
        flag: getFlag('Venezuela'),
        name: 'Venezuela',
        value: [180, 200],
      },
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: [150, 200],
      },
      Iran: {
        flag: getFlag('Iran'),
        name: 'Iran',
        value: [130, 200],
      },
    },
  },
  NORTH_KOREA: {
    denonym: 'Korean',
    independenceGuaranteedBy: [
      {
        flag: getFlag('China'),
        name: 'China',
      },
    ],
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
      'South Korea': {
        flag: getFlag('South Korea'),
        name: 'South Korea',
        value: -200,
      },
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: [180, 200],
      },
    },
  },
  ARMENIA: {
    denonym: 'Armenian',
    opinions: {
      Azerbaijan: {
        flag: getFlag('Azerbaijan'),
        name: 'Azerbaijan',
        value: -200,
      },
    },
  },
  AZERBAIJAN: {
    denonym: 'Azerbaijani',
    opinions: {
      Armenia: {
        flag: getFlag('Armenia'),
        name: 'Armenia',
        value: -200,
      },
    },
  },
  TURKEY: {
    denonym: 'Turkish',
    opinions: {
      Azerbaijan: {
        flag: getFlag('Azerbaijan'),
        name: 'Azerbaijan',
        value: 200,
      },
      Greece: {
        flag: getFlag('Greece'),
        name: 'Greece',
        value: -200,
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: [-200, -25],
      },
    },
  },
  GREECE: {
    denonym: 'Greek',
    opinions: {
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: [175, 200],
      },
      Turkey: {
        flag: getFlag('Turkey'),
        name: 'Turkey',
        value: -200,
      },
    },
  },
  INDIA: {
    denonym: 'Indian',
    opinions: {
      Pakistan: {
        flag: getFlag('Pakistan'),
        name: 'Pakistan',
        value: -200,
      },
    },
  },
  MEXICO: {
    denonym: 'Mexican',
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: [-200, -169],
      },
      Spain: {
        flag: getFlag('Spain'),
        name: 'Spain',
        value: [120, 200],
      },
    },
  },
  ARGENTINA: {
    denonym: 'Argentinian',
    opinions: {
      Brazil: {
        flag: getFlag('Brazil'),
        name: 'Brazil',
        value: [120, 200],
      },
      Spain: {
        flag: getFlag('Spain'),
        name: 'Spain',
        value: [120, 200],
      },
      'United Kingdom': {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
        value: [-200, -110],
      },
      Venezuela: {
        flag: getFlag('Venezuela'),
        name: 'Venezuela',
        value: [-200, -90],
      },
    },
  },
  BRAZIL: {
    denonym: 'Brazilian',
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: [120, 200],
      },
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: [120, 200],
      },
      India: {
        flag: getFlag('India'),
        name: 'India',
        value: [120, 200],
      },
      'South Africa': {
        flag: getFlag('South Africa'),
        name: 'South Africa',
        value: [120, 200],
      },
      Venezuela: {
        flag: getFlag('Venezuela'),
        name: 'Venezuela',
        value: [-200, -90],
      },
      Argentina: {
        flag: getFlag('Argentina'),
        name: 'Argentina',
        value: [120, 200],
      },
      Angola: {
        flag: getFlag('Angola'),
        name: 'Angola',
        value: [120, 200],
      },
      Mozambique: {
        flag: getFlag('Mozambique'),
        name: 'Mozambique',
        value: [120, 200],
      },
      Portugal: {
        flag: getFlag('Portugal'),
        name: 'Portugal',
        value: [175, 200],
      },
    },
  },
  VENEZUELA: {
    denonym: 'Venezuelan',
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
      Brazil: {
        flag: getFlag('Brazil'),
        name: 'Brazil',
        value: [-200, -190],
      },
      Iran: {
        flag: getFlag('Iran'),
        name: 'Iran',
        value: [185, 200],
      },
      China: {
        flag: getFlag('China'),
        name: 'China',
        value: [175, 200],
      },
    },
  },
  SERBIA: {
    denonym: 'Serbian',
    opinions: {
      Croatia: {
        flag: getFlag('Croatia'),
        name: 'Croatia',
        value: -200,
      },
      'Bosnia and Herzegovina': {
        flag: getFlag('Bosnia and Herzegovina'),
        name: 'Bosnia and Herzegovina',
        value: -200,
      },
      Kosovo: {
        flag: getFlag('Kosovo'),
        name: 'Kosovo',
        value: -200,
      },
      Slovenia: {
        flag: getFlag('Slovenia'),
        name: 'Slovenia',
        value: -200,
      },
      Montenegro: {
        flag: getFlag('Montenegro'),
        name: 'Montenegro',
        value: -200,
      },
      'North Macedonia': {
        flag: getFlag('North Macedonia'),
        name: 'North Macedonia',
        value: -200,
      },
    },
  },
  BOSNIA_AND_HERZEGOVINA: {
    denonym: 'Bosnian',
    opinions: {
      Croatia: {
        flag: getFlag('Croatia'),
        name: 'Croatia',
        value: -200,
      },
      Serbia: {
        flag: getFlag('Serbia'),
        name: 'Serbia',
        value: -200,
      },
      Kosovo: {
        flag: getFlag('Kosovo'),
        name: 'Kosovo',
        value: -200,
      },
      Slovenia: {
        flag: getFlag('Slovenia'),
        name: 'Slovenia',
        value: -200,
      },
      Montenegro: {
        flag: getFlag('Montenegro'),
        name: 'Montenegro',
        value: -200,
      },
      'North Macedonia': {
        flag: getFlag('North Macedonia'),
        name: 'North Macedonia',
        value: -200,
      },
    },
  },
  CROATIA: {
    denonym: 'Croatian',
    opinions: {
      'Bosnia and Herzegovina': {
        flag: getFlag('Bosnia and Herzegovina'),
        name: 'Bosnia and Herzegovina',
        value: -200,
      },
      Serbia: {
        flag: getFlag('Serbia'),
        name: 'Serbia',
        value: -200,
      },
      Kosovo: {
        flag: getFlag('Kosovo'),
        name: 'Kosovo',
        value: -200,
      },
      Slovenia: {
        flag: getFlag('Slovenia'),
        name: 'Slovenia',
        value: -200,
      },
      Montenegro: {
        flag: getFlag('Montenegro'),
        name: 'Montenegro',
        value: -200,
      },
      'North Macedonia': {
        flag: getFlag('North Macedonia'),
        name: 'North Macedonia',
        value: -200,
      },
    },
  },
  KOSOVO: {
    denonym: 'Kosovan',
    opinions: {
      'Bosnia and Herzegovina': {
        flag: getFlag('Bosnia and Herzegovina'),
        name: 'Bosnia and Herzegovina',
        value: -200,
      },
      Serbia: {
        flag: getFlag('Serbia'),
        name: 'Serbia',
        value: -200,
      },
      Croatia: {
        flag: getFlag('Croatia'),
        name: 'Croatia',
        value: -200,
      },
      Slovenia: {
        flag: getFlag('Slovenia'),
        name: 'Slovenia',
        value: -200,
      },
      Montenegro: {
        flag: getFlag('Montenegro'),
        name: 'Montenegro',
        value: -200,
      },
      'North Macedonia': {
        flag: getFlag('North Macedonia'),
        name: 'North Macedonia',
        value: -200,
      },
    },
  },
  SLOVENIA: {
    denonym: 'Slovene',
    opinions: {
      'Bosnia and Herzegovina': {
        flag: getFlag('Bosnia and Herzegovina'),
        name: 'Bosnia and Herzegovina',
        value: -200,
      },
      Serbia: {
        flag: getFlag('Serbia'),
        name: 'Serbia',
        value: -200,
      },
      Croatia: {
        flag: getFlag('Croatia'),
        name: 'Croatia',
        value: -200,
      },
      Kosovo: {
        flag: getFlag('Kosovo'),
        name: 'Kosovo',
        value: -200,
      },
      Montenegro: {
        flag: getFlag('Montenegro'),
        name: 'Montenegro',
        value: -200,
      },
      'North Macedonia': {
        flag: getFlag('North Macedonia'),
        name: 'North Macedonia',
        value: -200,
      },
    },
  },
  MONTENEGRO: {
    denonym: 'Montenegrin',
    opinions: {
      'Bosnia and Herzegovina': {
        flag: getFlag('Bosnia and Herzegovina'),
        name: 'Bosnia and Herzegovina',
        value: -200,
      },
      Serbia: {
        flag: getFlag('Serbia'),
        name: 'Serbia',
        value: -200,
      },
      Croatia: {
        flag: getFlag('Croatia'),
        name: 'Croatia',
        value: -200,
      },
      Kosovo: {
        flag: getFlag('Kosovo'),
        name: 'Kosovo',
        value: -200,
      },
      Slovenia: {
        flag: getFlag('Slovenia'),
        name: 'Slovenia',
        value: -200,
      },
      'North Macedonia': {
        flag: getFlag('North Macedonia'),
        name: 'North Macedonia',
        value: -200,
      },
    },
  },
  NORTH_MACEDONIA: {
    denonym: 'Macedonian',
    opinions: {
      'Bosnia and Herzegovina': {
        flag: getFlag('Bosnia and Herzegovina'),
        name: 'Bosnia and Herzegovina',
        value: -200,
      },
      Serbia: {
        flag: getFlag('Serbia'),
        name: 'Serbia',
        value: -200,
      },
      Croatia: {
        flag: getFlag('Croatia'),
        name: 'Croatia',
        value: -200,
      },
      Kosovo: {
        flag: getFlag('Kosovo'),
        name: 'Kosovo',
        value: -200,
      },
      Slovenia: {
        flag: getFlag('Slovenia'),
        name: 'Slovenia',
        value: -200,
      },
      Montenegro: {
        flag: getFlag('Montenegro'),
        name: 'Montenegro',
        value: -200,
      },
    },
  },
  ISRAEL: {
    denonym: 'Israeli',
    personality: aggressivePersonality,
    opinions: {
      Palestine: {
        flag: getFlag('Palestine'),
        name: 'Palestine',
        value: -200,
      },
      Egypt: {
        flag: getFlag('Egypt'),
        name: 'Egypt',
        value: -200,
      },
      Syria: {
        flag: getFlag('Syria'),
        name: 'Syria',
        value: -200,
      },
      Iraq: {
        flag: getFlag('Iraq'),
        name: 'Iraq',
        value: -200,
      },
      Iran: {
        flag: getFlag('Iran'),
        name: 'Iran',
        value: -200,
      },
      'Saudi Arabia': {
        flag: getFlag('Saudi Arabia'),
        name: 'Saudi Arabia',
        value: -200,
      },
    },
  },
  PALESTINE: {
    denonym: 'Palestinian',
    opinions: {
      Israel: {
        flag: getFlag('Israel'),
        name: 'Israel',
        value: -200,
      },
    },
  },
  EGYPT: {
    denonym: 'Egyptians',
    allies: [
      {
        flag: getFlag('Saudi Arabia'),
        name: 'Saudi Arabia',
      },
    ],
    opinions: {
      Israel: {
        flag: getFlag('Israel'),
        name: 'Israel',
        value: -200,
      },
    },
  },
  SAUDI_ARABIA: {
    denonym: 'Saudi Arabians',
    allies: [
      {
        flag: getFlag('Egypt'),
        name: 'Egypt',
      },
    ],
    opinions: {
      Israel: {
        flag: getFlag('Israel'),
        name: 'Israel',
        value: -200,
      },
    },
  },
  SYRIA: {
    denonym: 'Syrians',
    allies: [
      {
        flag: getFlag('Iran'),
        name: 'Iran',
      },
    ],
    opinions: {
      Israel: {
        flag: getFlag('Israel'),
        name: 'Israel',
        value: -200,
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
    },
  },
  IRAQ: {
    denonym: 'Iraqis',
    opinions: {
      Israel: {
        flag: getFlag('Israel'),
        name: 'Israel',
        value: -200,
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
    },
  },
  IRAN: {
    denonym: 'Persian',
    allies: [
      {
        flag: getFlag('Syria'),
        name: 'Syria',
      },
    ],
    opinions: {
      Israel: {
        flag: getFlag('Israel'),
        name: 'Israel',
        value: -200,
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
    },
  },
  AUSTRALIA: {
    denonym: 'Australian',
    allies: [
      {
        flag: getFlag('New Zealand'),
        name: 'New Zealand',
      },
    ],
    opinions: {
      'United Kingdom': {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
        value: 200,
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: 200,
      },
      'New Zealand': {
        flag: getFlag('New Zealand'),
        name: 'New Zealand',
        value: 200,
      },
      Canada: {
        flag: getFlag('Canada'),
        name: 'Canada',
        value: 200,
      },
      Japan: {
        flag: getFlag('Japan'),
        name: 'Japan',
        value: [190, 200],
      },
    },
  },
  NEW_ZEALAND: {
    denonym: 'New Zealander',
    personality: pacificPersonality,
    allies: [
      {
        flag: getFlag('Australia'),
        name: 'Australia',
      },
    ],
    opinions: {
      'United Kingdom': {
        flag: getFlag('United Kingdom'),
        name: 'United Kingdom',
        value: 200,
      },
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: 200,
      },
      Australia: {
        flag: getFlag('Australia'),
        name: 'Australia',
        value: 200,
      },
      Canada: {
        flag: getFlag('Canada'),
        name: 'Canada',
        value: 200,
      },
    },
  },
  MOZAMBIQUE: {
    denonym: 'Mozambicans',
    opinions: {
      Brazil: {
        flag: getFlag('Brazil'),
        name: 'Brazil',
        value: [160, 200],
      },
    },
  },
  ANGOLA: {
    denonym: 'Angolans',
    opinions: {
      Brazil: {
        flag: getFlag('Brazil'),
        name: 'Brazil',
        value: [160, 200],
      },
    },
  },
  AFGHANISTAN: {
    denonym: 'Afghan',
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
    },
  },
  KUWAIT: {
    denonym: 'Kuwaiti',
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
    },
  },
  LIBYA: {
    denonym: 'Libyan',
    opinions: {
      'United States': {
        flag: getFlag('United States'),
        name: 'United States',
        value: -200,
      },
    },
  },
  GEORGIA: {
    denonym: 'Georgian',
    opinions: {
      Russia: {
        flag: getFlag('Russia'),
        name: 'Russia',
        value: -200,
      },
    },
  },
};

function getFlag(countryName: string): string {
  return countriesWorldAOWV1.find(
    (country) => country.name.toLowerCase() === countryName.toLowerCase()
  )?.img;
}
