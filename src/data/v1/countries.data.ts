import { Continent } from '../../modules/country/country.typing';

// https://www.worldometers.info/oil/oil-reserves-by-country/
export enum CountryPersonalityV1 {
  PACIFIC = 'PACIFIC',
  NEUTRAL = 'NEUTRAL',
  AGGRESSIVE = 'AGGRESSIVE',
}

export enum CountryPassiveTypeV1 {
  INCOMING = 'INCREASE_INCOMING',
  DISCOUNT_DIVISIONS = 'DISCOUNT_ON_DIVISIONS',
  DISCOUNT_AIRCRAFTS = 'DISCOUNT_ON_AIRCRAFTS',
  DISCOUNT_WARSHIPS = 'DISCOUNT_ON_WARSHIPS',
  INCREASE_POWER = 'INCREASE_MP',
  FOCUS_CHANCE_ECONOMIC = 'INCREASE_ECONOMIC_FOCUS_CHANCE',
  FOCUS_CHANCE_WAR = 'INCREASE_WAR_FOCUS_CHANCE',
  FOCUS_CHANCE_DEFENSIVE = 'INCREASE_DEFENSIVE_FOCUS_CHANCE',
  FOCUS_CHANCE_STRATEGIC = 'INCREASE_STRATEGIC_FOCUS_CHANCE',
  ARMY_FOCUS_CHANCE = 'army_focus_chance',
  SHOP_BUY_CHANCE_DIVISIONS = 'INCREASE_BUY_DIVISIONS_CHANCE',
  SHOP_BUY_CHANCE_AIRCRAFTS = 'INCREASE_BUY_AIRCRAFTS_CHANCE',
  SHOP_BUY_CHANCE_WARSHIPS = 'INCREASE_BUY_WARSHIPS_CHANCE',
  DEFENSIVE_WAR = 'INCREASE_DEFENSIVE_WAR_MP',
  DEFENSIVE_WAR_LOSSES = 'DECREASE_CASUALTIES_DEFENSIVE_WARS',
}

export type CountryArmyV1 = {
  divisions: number;
  tanks?: number;
  aircrafts: number;
  warships: number;
};

export type CountryInfoV1 = {
  continent: Continent;
};

export type CountryLevelsV1 = {
  tech_military: number;
};

export type CountryEconomyV1 = {
  money: number;
};

export type CountryPassiveV1 = {
  type: CountryPassiveTypeV1;
  discountType?: string;
  increaseType?: string;
  focusType?: string;
  item?: string;
  amount: number;
};

export type CountryProvincePassiveV1 = {
  type: string;
  amount: number;
};

export type CountryProvinceDetails = {
  population: number;
};

export type CountryProvinceDevelopment = {
  administration?: number;
  military?: number;
  production: number;
  taxation: number;
};

export type CountryProvinceV1 = {
  id: string;
  img?: string;
  name: string;
  description?: string;
  capital?: boolean;
  details: CountryProvinceDetails;
  development: CountryProvinceDevelopment;
  passives: any[] | CountryProvincePassiveV1[];
  hasCoast?: boolean;
  hasIslands?: boolean;
  isIsland?: boolean;
  isIslands?: boolean;
  oilProduction?: number;
  incoming?: any;
};

export type CountryAllyV1 = {
  img: string;
  name: string;
};

export type CountryEnemyV1 = {
  img: string;
  name: string;
};

export type CountryOpinionV1 = {
  name: string;
  opinion: number;
};

export type CountryV1 = {
  id: string;
  tag: string;
  name: string;
  img: string;
  owner: string;
  colour?: string | null;
  aggressiveness?: number;
  totalAggressiveness?: number;
  personality?: CountryPersonalityV1;
  army: CountryArmyV1;
  info: CountryInfoV1;
  levels: CountryLevelsV1;
  economy: CountryEconomyV1;
  passives: CountryPassiveV1[];
  provinces: CountryProvinceV1[];
  allies?: CountryAllyV1[];
  enemies?: CountryEnemyV1[];
  inWarWith?: [];
  opinions?: CountryOpinionV1[];
  actions?: [];
  messages?: [];
  demands_rights?: [];
  guaranteeing_of?: string[];
  guaranteeing?: string[];

  // v2
  oil?: number;
};

export const countriesWorldAOWV1: CountryV1[] = [
  // Americas
  {
    id: 'US',
    tag: 'USA',
    name: 'United States',
    img: 'united_states.png',
    owner: 'IA',
    colour: null,
    aggressiveness: 248,
    totalAggressiveness: 1248,
    personality: CountryPersonalityV1.NEUTRAL,
    army: {
      divisions: 234,
      tanks: 575,
      aircrafts: 278,
      warships: 343,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 4191 }],
    provinces: [
      {
        id: 'US-VA',
        name: 'Virginia',
        capital: true,
        oilProduction: 90,
        details: {
          population: 1000000,
        },
        development: {
          production: 45,
          taxation: 45,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'US-MD',
        name: 'Maryland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 47,
          taxation: 52,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-PA',
        name: 'Pennsylvania',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 50,
          taxation: 54,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-NY',
        name: 'New York',
        capital: false,
        oilProduction: 111,
        details: {
          population: 1000000,
        },
        development: {
          production: 138,
          taxation: 146,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
        hasCoast: false,
      },
      {
        id: 'US-ME',
        name: 'Maine',
        oilProduction: 98,
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-WV',
        name: 'West Virginia',
        capital: false,
        oilProduction: 21,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'US-NC',
        name: 'North Carolina',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-SC',
        name: 'South Carolina',
        capital: false,
        oilProduction: 19,
        details: {
          population: 1000000,
        },
        development: {
          production: 31,
          taxation: 31,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-GA',
        name: 'Georgia',
        capital: false,
        oilProduction: 9,
        details: {
          population: 1000000,
        },
        development: {
          production: 45,
          taxation: 48,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-FL',
        name: 'Florida',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 45,
          taxation: 48,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'US-AL',
        name: 'Alabama',
        capital: false,
        oilProduction: 32,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-MS',
        name: 'Mississippi',
        capital: false,
        oilProduction: 23,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-LA',
        name: 'Louisiana',
        capital: false,
        oilProduction: 17,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-TN',
        name: 'Tennessee',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-KY',
        name: 'Kentucky',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-OH',
        name: 'Ohio',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 36,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-IN',
        name: 'Indiana',
        capital: false,
        oilProduction: 17,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-IL',
        name: 'Illinois',
        capital: false,
        oilProduction: 94,
        details: {
          population: 1000000,
        },
        development: {
          production: 67,
          taxation: 75,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-MI',
        name: 'Michigan',
        capital: false,
        oilProduction: 43,
        details: {
          population: 1000000,
        },
        development: {
          production: 43,
          taxation: 44,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'US-WI',
        name: 'Wisconsin',
        capital: false,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-AR',
        name: 'Arkansas',
        capital: false,
        oilProduction: 21,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-MO',
        name: 'Missouri',
        capital: false,
        oilProduction: 21,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-IA',
        name: 'Iowa',
        capital: false,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-MN',
        name: 'Minnesota',
        capital: false,
        oilProduction: 11,
        details: {
          population: 1000000,
        },
        development: {
          production: 40,
          taxation: 40,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-TX',
        name: 'Texas',
        oilProduction: 910,
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 49,
          taxation: 49,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: true,
      },
      {
        id: 'US-OK',
        name: 'Oklahoma',
        capital: false,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-KS',
        name: 'Kansas',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 31,
          taxation: 31,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-NE',
        name: 'Nebraska',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-SD',
        name: 'South Dakota',
        capital: false,
        oilProduction: 11,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-ND',
        name: 'North Dakota',
        capital: false,
        oilProduction: 817,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-NM',
        name: 'New Mexico',
        capital: false,
        oilProduction: 59,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-CO',
        name: 'Colorado',
        capital: false,
        oilProduction: 34,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-WY',
        name: 'Wyoming',
        capital: false,
        oilProduction: 13,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-MT',
        name: 'Montana',
        capital: false,
        oilProduction: 25,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-AZ',
        name: 'Arizona',
        capital: false,
        oilProduction: 29,
        details: {
          population: 1000000,
        },
        development: {
          production: 40,
          taxation: 40,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-UT',
        name: 'Utah',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-ID',
        name: 'Idaho',
        capital: false,
        oilProduction: 32,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-NV',
        name: 'Nevada',
        capital: false,
        oilProduction: 14,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'US-CA',
        name: 'California',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 72,
          taxation: 89,
        },
        passives: [{ type: 'increase_incoming', amount: 9 }],
        hasCoast: false,
      },
      {
        id: 'US-OR',
        name: 'Oregon',
        capital: false,
        oilProduction: 17,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'US-WA',
        name: 'Washington DC',
        capital: false,
        oilProduction: 49,
        details: {
          population: 1000000,
        },
        development: {
          production: 48,
          taxation: 53,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'US-AK',
        name: 'Alaska',
        capital: false,
        oilProduction: 215,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 17,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'US-HI',
        name: 'Hawaii',
        capital: false,
        oilProduction: 118,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PR',
        name: 'San Juan',
        capital: false,
        oilProduction: 259,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [{ img: 'japan.png', name: 'Japan' }],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'Canada', opinion: 200 },
      { name: 'China', opinion: -200 },
      { name: 'Russia', opinion: -200 },
      { name: 'North Korea', opinion: -200 },
      { name: 'Japan', opinion: 200 },
      { name: 'United Kingdom', opinion: 90 },
      { name: 'South Korea', opinion: 170 },
      { name: 'Germany', opinion: 100 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing_of: ['Philippines', 'Taiwan'],
  },
  {
    id: 'CA',
    tag: 'CAN',
    name: 'Canada',
    img: 'canada.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.PACIFIC,
    army: {
      divisions: 27,
      tanks: 49,
      aircrafts: 63,
      warships: 61,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 399 }],
    provinces: [
      {
        id: 'CA-ON',
        name: 'Ontario',
        capital: true,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 43,
          taxation: 44,
        },
        passives: [{ type: 'increase_incoming', amount: 15 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CA-QC',
        name: 'Quebec',
        capital: false,
        oilProduction: 90,
        details: {
          population: 1000000,
        },
        development: {
          production: 40,
          taxation: 40,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CA-NL',
        name: 'Newfoundland and Labrador',
        capital: false,
        oilProduction: 77,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CA-NB',
        name: 'New Brunswick',
        capital: false,
        oilProduction: 75,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CA-NS',
        name: 'Nova Scotia',
        capital: false,
        oilProduction: 59,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'CA-PE',
        name: 'Prince Edward Island',
        capital: false,
        oilProduction: 49,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
      {
        id: 'CA-MB',
        name: 'Manitoba',
        capital: false,
        oilProduction: 90,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'CA-SK',
        name: 'Saskatchewan',
        capital: false,
        oilProduction: 111,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CA-AB',
        name: 'Alberta',
        oilProduction: 780,
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CA-BC',
        name: 'British Columbia',
        capital: false,
        oilProduction: 215,
        details: {
          population: 1000000,
        },
        development: {
          production: 40,
          taxation: 40,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CA-YT',
        name: 'Yukon',
        capital: false,
        oilProduction: 315,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CA-NT',
        name: 'Northwest Territories',
        capital: false,
        oilProduction: 412,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CA-NU',
        name: 'Nunavut',
        capital: false,
        oilProduction: 415,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'United States', opinion: 200 },
      { name: 'United Kingdom', opinion: 199 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'MX',
    tag: 'MEX',
    name: 'Mexico',
    img: 'mexico.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 64,
      tanks: 49,
      aircrafts: 55,
      warships: 38,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 951.19 }],
    provinces: [
      {
        id: 'MX-GUA',
        name: 'Mexico City',
        capital: true,
        oilProduction: 66,
        details: {
          population: 1000000,
        },
        development: {
          production: 50,
          taxation: 55,
        },
        passives: [{ type: 'increase_incoming', amount: 15 }],
        hasCoast: false,
      },
      {
        id: 'MX-BCN',
        name: 'Baja California',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'MX-BCS',
        name: 'Baja California Sur',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'MX-SON',
        name: 'Sonora',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'MX-CHH',
        name: 'Chihuahua',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MX-COA',
        name: 'Coahuila',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MX-TAM',
        name: 'Tamaulipas',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-SIN',
        name: 'Sinaloa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-DUR',
        name: 'Durango',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MX-ZAC',
        name: 'Zacatecas',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MX-JAL',
        name: 'Jalisco',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-MIC',
        name: 'Michoacan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-GRO',
        name: 'Guerrero',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-HID',
        name: 'Hidalgo',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MX-VER',
        name: 'Veracruz',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-OAX',
        name: 'Oaxaca',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-CHP',
        name: 'Chiapas',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MX-ROO',
        name: 'Quintana Roo',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BZ',
    tag: 'BLZ',
    name: 'Belize',
    img: 'belize.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'BZ',
        name: 'Belmopan',
        capital: true,
        oilProduction: 5,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'SV',
    tag: 'SLV',
    name: 'El Salvador',
    img: 'el_salvador.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'SV',
        name: 'San Salvador',
        capital: true,
        oilProduction: 6,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'HN',
    tag: 'HND',
    name: 'Honduras',
    img: 'honduras.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'HN',
        name: 'Tegucigalpa',
        capital: true,
        oilProduction: 6,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'NIC',
    tag: 'NIC',
    name: 'Nicaragua',
    img: 'nicaragua.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'NI',
        name: 'Managua',
        capital: true,
        oilProduction: 6,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'GT',
    tag: 'GTM',
    name: 'Guatemala',
    img: 'guatemala.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'GT',
        name: 'Guatemala City',
        capital: true,
        oilProduction: 7,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'CR',
    tag: 'CRI',
    name: 'Costa Rica',
    img: 'costa_rica.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 34 }],
    provinces: [
      {
        id: 'CR',
        name: 'San Jose',
        capital: true,
        oilProduction: 16,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'PG',
    tag: 'PNG',
    name: 'Panama',
    img: 'panama.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 29 }],
    provinces: [
      {
        id: 'PA',
        name: 'Panama City',
        capital: true,
        oilProduction: 23,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'CU',
    tag: 'CUB',
    name: 'Cuba',
    img: 'cuba.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 3,
      tanks: 2,
      aircrafts: 1,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'CU',
        name: 'Havana',
        capital: true,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [{ type: 'increase_incoming', amount: 1 }],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BS',
    tag: 'BHS',
    name: 'The Bahamas',
    img: 'bahamas.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 40 }],
    provinces: [
      {
        id: 'BS',
        name: 'Nassau',
        capital: true,
        oilProduction: 6,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'JM',
    tag: 'JAM',
    name: 'Jamaica',
    img: 'jamaica.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'JM',
        name: 'Kingston',
        capital: true,
        oilProduction: 6,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'HT',
    tag: 'HTI',
    name: 'Haiti',
    img: 'haiti.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'HT',
        name: 'Port-au-Prince',
        capital: true,
        oilProduction: 11,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'DO',
    tag: 'DOM',
    name: 'Dominican Republic',
    img: 'dominican_republic.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.NORTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 35 }],
    provinces: [
      {
        id: 'DO',
        name: 'Santo Domingo',
        capital: true,
        oilProduction: 6,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  // South America
  {
    id: 'CO',
    tag: 'COL',
    name: 'Colombia',
    img: 'colombia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 34,
      tanks: 25,
      aircrafts: 39,
      warships: 29,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 755 }],
    provinces: [
      {
        id: 'CO-BOY',
        name: 'Bogota',
        capital: true,
        oilProduction: 58,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: false,
      },
      {
        id: 'CO-AMA',
        name: 'Amazonas ',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CO-CAQ',
        name: 'Putamayo',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CO-NAR',
        name: 'Nariño',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CO-TOL',
        name: 'Cauca',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CO-CHO',
        name: 'Choco',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'CO-SUC',
        name: 'La Guajira',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CO-GUA',
        name: 'Vaupes',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CO-MET',
        name: 'Meta',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CO-VID',
        name: 'Vichada',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CO-ARA',
        name: 'Arauca',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'VE',
    tag: 'VEN',
    name: 'Venezuela',
    img: 'venezuela.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 31,
      tanks: 23,
      aircrafts: 21,
      warships: 15,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 546 }],
    provinces: [
      {
        id: 'VE-J',
        name: 'Caracas',
        capital: true,
        oilProduction: 519,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [{ type: 'increase_incoming', amount: 1 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'VE-Z',
        name: 'Amazonas  ',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'VE-F',
        name: 'Bolivar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'VE-E',
        name: 'Apure',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'VE-V',
        name: 'Falcon',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'VE-B',
        name: 'Monagas',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'EC',
    tag: 'ECU',
    name: 'Ecuador',
    img: 'ecuador.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 7,
      tanks: 4,
      aircrafts: 5,
      warships: 5,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 396 }],
    provinces: [
      {
        id: 'EC',
        name: 'Quito',
        capital: true,
        oilProduction: 77,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'PE',
    tag: 'PER',
    name: 'Peru',
    img: 'peru.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 31,
      tanks: 26,
      aircrafts: 29,
      warships: 13,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 650 }],
    provinces: [
      {
        id: 'PE-PAS',
        name: 'Lima',
        capital: true,
        oilProduction: 80,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: true,
      },
      {
        id: 'PE-LAL',
        name: 'Ancash',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PE-LAM',
        name: 'La Libertad',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PE-LOR',
        name: 'Loreto',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PE-UCA',
        name: 'Ucayali',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PE-MDD',
        name: 'Madre de Dios',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PE-AYA',
        name: 'Arequipa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PE-MOQ',
        name: 'Tacna',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BO',
    tag: 'BOL',
    name: 'Bolivia',
    img: 'bolivia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 21,
      tanks: 16,
      aircrafts: 10,
      warships: 3,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 242 }],
    provinces: [
      {
        id: 'BO-L',
        name: 'La Paz',
        capital: true,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BO-H',
        name: 'Sucre',
        capital: true,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BO-P',
        name: 'Potosi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BO-O',
        name: 'Oruro',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BO-S',
        name: 'Santa Cruz ',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BO-B',
        name: 'El Beni',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BO-N',
        name: 'Pando',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'GY',
    tag: 'GUY',
    name: 'Guyana',
    img: 'guyana.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 25 }],
    provinces: [
      {
        id: 'GY',
        name: 'Georgetown',
        capital: true,
        oilProduction: 16,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 7,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'SR',
    tag: 'SUR',
    name: 'Suriname',
    img: 'suriname.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 25 }],
    provinces: [
      {
        id: 'SR',
        name: 'Paramaribo',
        capital: true,
        oilProduction: 16,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 7,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BR',
    tag: 'BRA',
    name: 'Brazil',
    img: 'brazil.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.PACIFIC,
    army: {
      divisions: 75,
      tanks: 61,
      aircrafts: 66,
      warships: 40,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 801.43 }],
    provinces: [
      {
        id: 'BR-GO',
        name: 'Distrito Federal',
        capital: true,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BR-RS',
        name: 'Rio Grande do Sul',
        capital: false,
        oilProduction: 14,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'BR-SC',
        name: 'Santa Catarina',
        capital: false,
        oilProduction: 14,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 26,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-PR',
        name: 'Parana',
        capital: false,
        oilProduction: 14,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'BR-SP',
        name: 'Sao Paulo',
        capital: false,
        oilProduction: 115,
        details: {
          population: 1000000,
        },
        development: {
          production: 50,
          taxation: 54,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-RJ',
        name: 'Rio de Janeiro',
        capital: false,
        oilProduction: 825,
        details: {
          population: 1000000,
        },
        development: {
          production: 40,
          taxation: 40,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-ES',
        name: 'Espirito Santo',
        capital: false,
        oilProduction: 215,
        details: {
          population: 1000000,
        },
        development: {
          production: 21,
          taxation: 21,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-MG',
        name: 'Minas Gerais',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BR-BA',
        name: 'Bahia',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 19,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-MS',
        name: 'Mato Grosso do Sul',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BR-MT',
        name: 'Mato Grosso',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BR-RO',
        name: 'Rondonia',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BR-AM',
        name: 'Amazonas',
        capital: false,
        oilProduction: 115,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BR-PA',
        name: 'Para',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-TO',
        name: 'Tocantins',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'BR-MA',
        name: 'Maranhao',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-PI',
        name: 'Piaui',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'BR-CE',
        name: 'Ceara',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-AP',
        name: 'Amapa',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 9,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'BR-RR',
        name: 'Roraima',
        capital: false,
        oilProduction: 30,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'AR',
    tag: 'ARG',
    name: 'Argentina',
    img: 'argentina.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 47,
      tanks: 39,
      aircrafts: 46,
      warships: 41,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 850 }],
    provinces: [
      {
        id: 'AR-B',
        name: 'Buenos Aires',
        capital: true,
        oilProduction: 146,
        details: {
          population: 1000000,
        },
        development: {
          production: 47,
          taxation: 51,
        },
        passives: [{ type: 'increase_incoming', amount: 13 }],
        hasCoast: true,
      },
      {
        id: 'AR-Z',
        name: 'Santa Cruz',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AR-R',
        name: 'Rio Negro',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AR-M',
        name: 'Medonza',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AR-L',
        name: 'Cordoba',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AR-S',
        name: 'Santa Fe',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AR-J',
        name: 'San Juan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AR-K',
        name: 'Catamarca',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AR-A',
        name: 'Salta',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AR-H',
        name: 'Formosa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AR-W',
        name: 'Misiones',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'CL',
    tag: 'CHL',
    name: 'Chile',
    img: 'chile.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 66,
      tanks: 55,
      aircrafts: 68,
      warships: 32,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 735 }],
    provinces: [
      {
        id: 'CL-BI',
        name: 'Santiago',
        capital: true,
        oilProduction: 90,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 38,
        },
        passives: [{ type: 'increase_incoming', amount: 7 }],
        hasCoast: true,
      },
      {
        id: 'CL-AT',
        name: 'Atacama',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'CL-TA',
        name: 'Tarapaca',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'CL-LL',
        name: 'Los Lagos',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'UY',
    tag: 'URY',
    name: 'Uruguay',
    img: 'uruguay.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 11,
      tanks: 5,
      aircrafts: 5,
      warships: 4,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 199 }],
    provinces: [
      {
        id: 'UY',
        name: 'Montevideo',
        capital: true,
        oilProduction: 69,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 28,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'PY',
    tag: 'PRY',
    name: 'Paraguay',
    img: 'paraguay.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 10,
      tanks: 3,
      aircrafts: 3,
      warships: 0,
    },
    info: {
      continent: Continent.SOUTH_AMERICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 100 }],
    provinces: [
      {
        id: 'PY-15',
        name: 'Asuncion',
        capital: true,
        oilProduction: 46,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 22,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: false,
      },
      {
        id: 'PY-9',
        name: 'Alto Parana',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PY-13',
        name: 'Concepcion',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PY-19',
        name: 'Boqueron',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PY-16',
        name: 'Alto Paraguay',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  // Asia
  {
    id: 'CN',
    tag: 'CHN',
    name: 'China',
    img: 'china.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.AGGRESSIVE,
    army: {
      divisions: 578,
      tanks: 519,
      aircrafts: 148,
      warships: 169,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 3463 }],
    provinces: [
      {
        id: 'CN-11',
        name: 'Beijing',
        capital: true,
        oilProduction: 137,
        details: {
          population: 1000000,
        },
        development: {
          production: 46,
          taxation: 46,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
        hasCoast: true,
      },
      {
        id: 'CN-13',
        name: 'Hebei',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 33,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'CN-37',
        name: 'Shandong',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 33,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CN-31',
        name: 'Shanghai',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 44,
          taxation: 44,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CN-32',
        name: 'Jiangsu',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CN-33',
        name: 'Zhejiang',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 33,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CN-35',
        name: 'Fujian',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-44',
        name: 'Hong Kong',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 46,
          taxation: 50,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CN-46',
        name: 'Hainan',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'CN-45',
        name: 'Guangxi Zhuang',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 28,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-36',
        name: 'Jiangxi',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 26,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-34',
        name: 'Anhui',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-43',
        name: 'Hunan',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-42',
        name: 'Hubei',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-41',
        name: 'Henan',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-61',
        name: 'Shaanxi',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-14',
        name: 'Shanxi',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-15',
        name: 'Nei Mongol',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-21',
        name: 'Liaoning',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'CN-22',
        name: 'Jilin',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-23',
        name: 'Heilongjiang',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-53',
        name: 'Yunnan',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-51',
        name: 'Sichuan',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 17,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-52',
        name: 'Chongqing',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-50',
        name: 'Guizhou',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-64',
        name: 'Ningxia Hui',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-62',
        name: 'Gansu',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-63',
        name: 'Quinghai',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-54',
        name: 'Xizang',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'CN-65',
        name: 'Xinjiang Uygur',
        capital: false,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'United States', opinion: -200 },
      { name: 'Japan', opinion: -180 },
      { name: 'South Korea', opinion: -130 },
      { name: 'Russia', opinion: 180 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'MN',
    tag: 'MNG',
    name: 'Mongolia',
    img: 'mongolia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 10,
      tanks: 3,
      aircrafts: 5,
      warships: 7,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 180 }],
    provinces: [
      {
        id: 'MNG3329',
        name: 'Ulaanbaatar',
        capital: true,
        oilProduction: 29,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3326',
        name: 'Sukhbaatar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3315',
        name: 'Choibalsan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3333',
        name: 'Baruun-Urt',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3297',
        name: 'Sainshand',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3298',
        name: 'Dalanzadgad',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3325',
        name: 'Mandalgovi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3327',
        name: 'Arvaikheer',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3317',
        name: 'Bayanbulag',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3316',
        name: 'Jargalant',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3323',
        name: 'Khorgo',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3321',
        name: 'Murun',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3319',
        name: 'Altai',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3318',
        name: 'Ulaangom',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3320',
        name: 'Khovd',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3208',
        name: 'Ulgii',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3322',
        name: 'Turgen',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'MNG3332',
        name: 'Matad',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'KP',
    tag: 'PRK',
    name: 'North Korea',
    img: 'north_korea.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.AGGRESSIVE,
    army: {
      divisions: 59,
      tanks: 65,
      aircrafts: 70,
      warships: 38,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 746 }],
    provinces: [
      {
        id: 'PRK3313',
        name: 'Pyongyang',
        capital: true,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'PRK3311',
        name: 'Hamhung',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 26,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PRK3314',
        name: 'Chongjin',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PRK3310',
        name: 'Kusong',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 22,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'South Korea', opinion: -200 },
      { name: 'United States', opinion: -200 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'KR',
    tag: 'KOR',
    name: 'South Korea',
    img: 'south_korea.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 56,
      tanks: 34,
      aircrafts: 55,
      warships: 43,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 844.83 }],
    provinces: [
      {
        id: 'KR-42',
        name: 'Seoul',
        capital: true,
        oilProduction: 38,
        details: {
          population: 1000000,
        },
        development: {
          production: 45,
          taxation: 48,
        },
        passives: [{ type: 'increase_incoming', amount: 18 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'KR-45',
        name: 'Chungcheong',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 34,
          taxation: 34,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'KR-48',
        name: 'Gyeongsang',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 35,
          taxation: 35,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'KR-49',
        name: 'Jeju',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'North Korea', opinion: -200 },
      { name: 'China', opinion: -200 },
      { name: 'United States', opinion: 200 },
      { name: 'Japan', opinion: 200 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'JP',
    tag: 'JPN',
    name: 'Japan',
    img: 'japan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.PACIFIC,
    army: {
      divisions: 110,
      tanks: 99,
      aircrafts: 144,
      warships: 185,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 2658 }],
    provinces: [
      {
        id: 'JP-11',
        name: 'Tokyo',
        capital: true,
        oilProduction: 90,
        details: {
          population: 1000000,
        },
        development: {
          production: 139,
          taxation: 148,
        },
        passives: [{ type: 'increase_incoming', amount: 25 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-04',
        name: 'Fukushima',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 38,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-03',
        name: 'Yagamata',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 36,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-01',
        name: 'Hokkaido',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 36,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-14',
        name: 'Aichi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 39,
          taxation: 39,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-16',
        name: 'Ishikawa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 38,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-24',
        name: 'Osaka',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 55,
          taxation: 60,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-28',
        name: 'Hyogo',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 38,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-39',
        name: 'Tokushima',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 37,
          taxation: 37,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-34',
        name: 'Hiroshima',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 39,
          taxation: 39,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'JP-40',
        name: 'Nagasaki',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 39,
          taxation: 39,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [{ img: 'united_states.png', name: 'United States' }],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'Canada', opinion: 160 },
      { name: 'United States', opinion: 200 },
      { name: 'China', opinion: -200 },
      { name: 'North Korea', opinion: -200 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'IN',
    tag: 'IND',
    name: 'India',
    img: 'india.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 394,
      tanks: 146,
      aircrafts: 98,
      warships: 77,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 2112 }],
    provinces: [
      {
        id: '_13',
        name: 'New Delhi',
        capital: true,
        oilProduction: 75,
        details: {
          population: 1000000,
        },
        development: {
          production: 37,
          taxation: 35,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: false,
      },
      {
        id: '_33',
        name: 'Uttar Pradesh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_34',
        name: 'Uttarakhand',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_14',
        name: 'Himachal Pradesh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IN',
        name: 'Jammu and Kashmir',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_28',
        name: 'Punjab',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_29',
        name: 'Rajasthan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_12',
        name: 'Gujarat',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: '_20',
        name: 'Madhya Pradesh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_21',
        name: 'Maharashtra',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_7',
        name: 'Chhattisgarh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_5',
        name: 'Bihar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_35',
        name: 'West Bengal',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: '_3',
        name: 'Arunachal Pradesh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_4',
        name: 'Assam',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_25',
        name: 'Nagaland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_23',
        name: 'Meghalaya',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_32',
        name: 'Mizoram',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_26',
        name: 'Odisha',
        capital: true,
        oilProduction: 37,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: '_2',
        name: 'Andhra Pradesh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: '_37',
        name: 'Telangana',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: '_11',
        name: 'Goa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: '_17',
        name: 'Karnataka',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: '_18',
        name: 'Kerala',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: '_31',
        name: 'Tamil Nadu',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'ID',
    tag: 'IDN',
    name: 'Indonesia',
    img: 'indonesia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 48,
      tanks: 39,
      aircrafts: 49,
      warships: 61,
    },
    info: {
      continent: Continent.OCEANIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 1027.15 }],
    provinces: [
      {
        id: 'ID-JB',
        name: 'Jakarta',
        capital: true,
        oilProduction: 99,
        details: {
          population: 1000000,
        },
        development: {
          production: 37,
          taxation: 38,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-JT',
        name: 'Jawa Tengah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-JI',
        name: 'Jawa Timur',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-BA',
        name: 'Bali',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
      {
        id: 'TL_0',
        name: 'East Timor',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
        hasIslands: true,
      },
      {
        id: 'ID-MA',
        name: 'Maluku',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
      {
        id: 'ID-SA',
        name: 'Sulawesi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
      {
        id: 'ID-MU',
        name: 'Maluku Utara',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
      {
        id: 'ID-PB',
        name: 'Papua Barat',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-PA',
        name: 'Papua',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-KS',
        name: 'Kalimantan Selatan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-KT',
        name: 'Kalimantan Tengah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ID-KB',
        name: 'Kalimantan Barat',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-KI',
        name: 'Kalimantan Timur',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ID-KU',
        name: 'Kalimantan Utara',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ID-JA',
        name: 'Jambi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ID-BB',
        name: 'Bangka Belitung',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'ID-BE',
        name: 'Bengkulu',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ID-SB',
        name: 'Sumatera Barat',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-RI',
        name: 'Riau',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'ID-SU',
        name: 'Sumatera Utara and Aceh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'LK',
    tag: 'LKA',
    name: 'Sri Lanka',
    img: 'sri_lanka.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'LK',
        name: 'Colombo',
        capital: true,
        oilProduction: 34,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'MM',
    tag: 'MMR',
    name: 'Myanmar',
    img: 'myanmar.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 26,
      tanks: 13,
      aircrafts: 23,
      warships: 19,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 600 }],
    provinces: [
      {
        id: 'MM',
        name: 'Naypyitaw',
        capital: true,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 10,
        },
        passives: [{ type: 'increase_incoming', amount: 1 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'LA',
    tag: 'LAO',
    name: 'Laos',
    img: 'laos.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'LA',
        name: 'Vientiane',
        capital: true,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'VN',
    tag: 'VNM',
    name: 'Vietnam',
    img: 'vietnam.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 35,
      tanks: 27,
      aircrafts: 37,
      warships: 25,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 839 }],
    provinces: [
      {
        id: 'VN',
        name: 'Hanoi',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 18,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'TH',
    tag: 'THA',
    name: 'Thailand',
    img: 'thailand.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 38,
      tanks: 30,
      aircrafts: 36,
      warships: 25,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 780 }],
    provinces: [
      {
        id: 'TH',
        name: 'Bangkok',
        capital: true,
        oilProduction: 72,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [{ type: 'increase_incoming', amount: 6 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'KH',
    tag: 'KHM',
    name: 'Cambodia',
    img: 'cambodia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 7,
      tanks: 2,
      aircrafts: 0,
      warships: 1,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 120 }],
    provinces: [
      {
        id: 'KH',
        name: 'Phnom Penh',
        capital: true,
        oilProduction: 39,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'MY',
    tag: 'MYS',
    name: 'Malaysia',
    img: 'malaysia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 26,
      tanks: 16,
      aircrafts: 21,
      warships: 17,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 588 }],
    provinces: [
      {
        id: 'MY',
        name: 'Kuala Lumpur',
        capital: true,
        oilProduction: 99,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 30,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BN',
    tag: 'BRN',
    name: 'Brunei',
    img: 'brunei.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'BN',
        name: 'Bandar Seri Begawan',
        capital: true,
        oilProduction: 14,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  /*{
    id: 'SG',
    tag: 'SGP',
    name: 'Singapore',
    img: 'singapore.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 0 },
    ],
    provinces: [
      {
        id: null,
        name: 'PROVINCE_NAME',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [

        ],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },*/ {
    id: 'PG',
    tag: 'PNG',
    name: 'Papua New Guinea',
    img: 'papua_new_guinea.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.OCEANIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 25 }],
    provinces: [
      {
        id: 'PG',
        name: 'Port Moresby',
        capital: true,
        oilProduction: 11,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 7,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'PH',
    tag: 'PHL',
    name: 'Philippines',
    img: 'philippines.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 23,
      tanks: 6,
      aircrafts: 11,
      warships: 9,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 459 }],
    provinces: [
      {
        id: 'PH',
        name: 'Manila',
        capital: true,
        oilProduction: 41,
        details: {
          population: 1000000,
        },
        development: {
          production: 29,
          taxation: 30,
        },
        passives: [{ type: 'increase_incoming', amount: 1 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing: ['United States'],
  },
  {
    id: 'TW',
    tag: 'TWN',
    name: 'Taiwan',
    img: 'taiwan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 49,
      tanks: 35,
      aircrafts: 42,
      warships: 28,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 788 }],
    provinces: [
      {
        id: 'CN-71',
        name: 'Taipei',
        capital: true,
        oilProduction: 99,
        details: {
          population: 1000000,
        },
        development: {
          production: 45,
          taxation: 45,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
        hasCoast: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing: ['United States'],
  },
  {
    id: 'BD',
    tag: 'BGD',
    name: 'Bangladesh',
    img: 'bangladesh.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 24,
      tanks: 11,
      aircrafts: 14,
      warships: 18,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 665 }],
    provinces: [
      {
        id: 'BD',
        name: 'Dhaka',
        capital: true,
        oilProduction: 89,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 25,
        },
        passives: [{ type: 'increase_incoming', amount: 1 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BT',
    tag: 'BT',
    name: 'Bhutan',
    img: 'bhutan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'BT',
        name: 'Thimphu',
        capital: true,
        oilProduction: 4,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'NP',
    tag: 'NPL',
    name: 'Nepal',
    img: 'nepal.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'NP',
        name: 'Kathmandu',
        capital: true,
        oilProduction: 5,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 7,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'KZ',
    tag: 'KAZ',
    name: 'Kazakhstan',
    img: 'kazakhstan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 5,
      tanks: 3,
      aircrafts: 3,
      warships: 1,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'KZ-AKM',
        name: 'Nur Sultan',
        capital: true,
        oilProduction: 126,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [{ type: 'increase_incoming', amount: 1 }],
        hasCoast: false,
      },
      {
        id: 'KZ-SEV',
        name: 'Soltustik Qazaqstan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-PAV',
        name: 'Pavlodar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-VOS',
        name: 'Shyghys Qazaqstan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-ALM',
        name: 'Almaty',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-KAR',
        name: 'Qaraghandy',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-ZHA',
        name: 'Zhambyl',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-YUZ',
        name: 'Ongtustik Qazaqstan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-KZY',
        name: 'Qyzylorda',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-KUS',
        name: 'Qostanay',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-AKT',
        name: 'Aqtobe',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-ZAP',
        name: 'Batys Qazaqstan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-ATY',
        name: 'Atyrau',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'KZ-MAN',
        name: 'Mangghystau',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'UZ',
    tag: 'UZB',
    name: 'Uzbekistan',
    img: 'uzbekistan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 13,
      tanks: 7,
      aircrafts: 15,
      warships: 2,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 125 }],
    provinces: [
      {
        id: 'UZ',
        name: 'Tashkent',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'KG',
    tag: 'KGZ',
    name: 'Kyrgyzstan',
    img: 'kyrgyzstan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 18 }],
    provinces: [
      {
        id: 'KG',
        name: 'Bishkek',
        capital: true,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'TJ',
    tag: 'TJK',
    name: 'Tajikistan',
    img: 'tajikistan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'TJ',
        name: 'Dushanbe',
        capital: true,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'TM',
    tag: 'TKM',
    name: 'Turkmenistan',
    img: 'turkmenistan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 3,
      tanks: 1,
      aircrafts: 1,
      warships: 1,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 90 }],
    provinces: [
      {
        id: 'TM',
        name: 'Ashgabat',
        capital: true,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'IR',
    tag: 'IRN',
    name: 'Iran',
    img: 'iran.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 56,
      tanks: 33,
      aircrafts: 45,
      warships: 50,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 716 }],
    provinces: [
      {
        id: 'IR-32',
        name: 'Tehran',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 29,
          taxation: 29,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: false,
      },
      {
        id: 'IR-02',
        name: 'West Azeribaijan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-01',
        name: 'East Azerbaijan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-16',
        name: 'Kordestan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-11',
        name: 'Zanjan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-19',
        name: 'Gilan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-05',
        name: 'Kermanshah',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-20',
        name: 'Lorestan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-24',
        name: 'Hamadan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-28',
        name: 'Qazvin',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-22',
        name: 'Markazi',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-21',
        name: 'Mazandaran',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-27',
        name: 'Golestan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-31',
        name: 'North Khorasan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-30',
        name: 'Razavi Khorasan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-12',
        name: 'Semnan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-04',
        name: 'Esfahan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-25',
        name: 'Yazd',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-29',
        name: 'South Khorasan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-13',
        name: 'Sistan and Baluchestan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'IR-15',
        name: 'Kerman',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-23',
        name: 'Hormozgan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        isIslands: true,
      },
      {
        id: 'IR-14',
        name: 'Fars',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-08',
        name: 'Kohgiluyeh and Buyer Ahmad',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'IR-10',
        name: 'Khuzestan',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'IR-06',
        name: 'Bushehr',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'KW',
    tag: 'KWT',
    name: 'Kuwait',
    img: 'kuwait.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 5,
      tanks: 5,
      aircrafts: 2,
      warships: 3,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 100 }],
    provinces: [
      {
        id: 'KW',
        name: 'Kuwait City',
        capital: true,
        oilProduction: 715,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'SA',
    tag: 'SAU',
    name: 'Saudi Arabia',
    img: 'saudi_arabia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 60,
      tanks: 55,
      aircrafts: 55,
      warships: 37,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 939 }],
    provinces: [
      {
        id: 'SA-04',
        name: 'Riyadh',
        capital: true,
        oilProduction: 415,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [{ type: 'increase_incoming', amount: 9 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'SA-10',
        name: 'Najran',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'SA-14',
        name: 'Asir',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'SA-01',
        name: 'Ar Riyad',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'SA-02',
        name: 'Makkah',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SA-03',
        name: 'Al Madinah',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SA-05',
        name: 'Al Qasim',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'SA-06',
        name: "Ha'il",
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'SA-07',
        name: 'Tabuk',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'SA-12',
        name: 'Al Jawf',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'SA-08',
        name: 'Al Hudud ash Shamaliyah',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'QA',
    tag: 'QAT',
    name: 'Qatar',
    img: 'qatar.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 2,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 0 }],
    provinces: [
      {
        id: 'QA',
        name: 'Doha',
        capital: true,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 36,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'AE',
    tag: 'ARE',
    name: 'United Arab Emirates',
    img: 'united_arab_emirates.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 44,
      tanks: 37,
      aircrafts: 55,
      warships: 39,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 970 }],
    provinces: [
      {
        id: 'AE',
        name: 'Abu Dhabi',
        capital: true,
        oilProduction: 944,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 36,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'OM',
    tag: 'OMN',
    name: 'Oman',
    img: 'oman.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 4,
      tanks: 3,
      aircrafts: 2,
      warships: 2,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 0 }],
    provinces: [
      {
        id: 'OM-BAS',
        name: 'Muscat',
        capital: true,
        oilProduction: 288,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 17,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
      {
        id: 'AE-FU',
        name: 'Al Batinah North',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'OM-BU',
        name: 'Al Buraymi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'OM-ZA',
        name: 'Az Zahirah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'OM-DA',
        name: 'Ad Dakhiliyah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'OM-SHS',
        name: 'Ash Sharqiyah South',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'OM-WU',
        name: 'Al Wusta',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'OM-ZU',
        name: 'Zufar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'YE',
    tag: 'YEM',
    name: 'Yemen',
    img: 'yemen.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 2,
      tanks: 1,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 0 }],
    provinces: [
      {
        id: 'YE-MA',
        name: "Sana'a",
        capital: true,
        oilProduction: 233,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'YE-SD',
        name: 'Al Hudaydah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'YE-LA',
        name: 'Lahij',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'YE-JA',
        name: 'Al Jawf ',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'YE-SH',
        name: 'Shabwah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'YE-HD',
        name: 'Hadramawt',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'YE-MR',
        name: 'Al Mahrah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'AF',
    tag: 'AFG',
    name: 'Afghanistan',
    img: 'afghanistan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 31,
      tanks: 22,
      aircrafts: 25,
      warships: 13,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 409 }],
    provinces: [
      {
        id: 'AFG1771',
        name: 'Kabul',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [{ type: 'increase_incoming', amount: 2 }],
        hasCoast: false,
      },
      {
        id: 'AFG1761',
        name: 'Jalalabad',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1760',
        name: 'Mirkan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1765',
        name: 'Taleqan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1766',
        name: 'Farkhar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1773',
        name: 'Kunduz',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1743',
        name: 'Baghlan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1745',
        name: 'Mazari Sharif',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1742',
        name: 'Herat',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1749',
        name: 'Farah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1751',
        name: 'Delaram',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1750',
        name: 'Lashkar Gah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1754',
        name: 'Kandahar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1755',
        name: 'Day Chopan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1757',
        name: 'Chora',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'AFG1747',
        name: 'Monara',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'PK',
    tag: 'PAK',
    name: 'Pakistan',
    img: 'pakistan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 70,
      tanks: 47,
      aircrafts: 66,
      warships: 39,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 1039.15 }],
    provinces: [
      {
        id: 'PK-KP',
        name: 'Islamabad',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 22,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: false,
      },
      {
        id: 'PK-PB',
        name: 'Punjab ',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'PK-BA',
        name: 'Balochistan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PK-SD',
        name: 'Sindh',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PK-TA',
        name: 'Tribal Areas',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  // Africa
  {
    id: 'MR',
    tag: 'MTQ',
    name: 'Mauritania',
    img: 'mauritania.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 23 }],
    provinces: [
      {
        id: 'MR',
        name: 'Nouakchott',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'ML',
    tag: 'MLI',
    name: 'Mali',
    img: 'mali.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'ML',
        name: 'Bamako',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'NE',
    tag: 'NER',
    name: 'Niger',
    img: 'niger.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'NE',
        name: 'Niamey',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'TD',
    tag: 'TCD',
    name: 'Chad',
    img: 'chad.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'TD',
        name: "N'Djamena",
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'SD',
    tag: 'SDN',
    name: 'Sudan',
    img: 'sudan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.AGGRESSIVE,
    army: {
      divisions: 2,
      tanks: 1,
      aircrafts: 0,
      warships: 1,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 80 }],
    provinces: [
      {
        id: 'SD',
        name: 'Khartoum',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'SS',
    tag: 'SSD',
    name: 'South Sudan',
    img: 'south_sudan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'SS',
        name: 'Juba',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'SN',
    tag: 'SEN',
    name: 'Senegal',
    img: 'senegal.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 22 }],
    provinces: [
      {
        id: 'SN',
        name: 'Dakar',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  // {
  //   id: 'GM',
  //   tag: 'GMB',
  //   name: 'Gambia',
  //   img: 'gambia.png',
  //   owner: 'IA',
  //   colour: '#FFFFFF',
  //   army: {
  //     divisions: 0,
  //     aircrafts: 0,
  //     warships: 0,
  //   },
  //   info: {
  //     continent: Continent.AFRICA,
  //   },
  //   levels: {
  //     tech_military: 10,
  //   },
  //   economy: {
  //     money: 0,
  //   },
  //   passives: [
  //     { type: CountryPassiveTypeV1.INCOMING, amount: 0 },
  //   ],
  //   provinces: [
  //     {
  //       id: null,
  //       name: 'PROVINCE_NAME',
  //       capital: false,
  //       details: {
  //         population: 1000000,
  //       },
  //       development: {
  //         production: 10,
  //         taxation: 10,
  //       },
  //       passives: [

  //       ],
  //       hasCoast: false,
  //     },
  //   ],
  //   allies: [],
  //   enemies: [],
  //   inWarWith: [],
  //   opinions: [],
  //   actions: [],
  //   messages: [],
  //   demands_rights: [],
  // },
  // {
  //   id: 'GW',
  //   tag: 'GNB',
  //   name: 'Guinea-Bissau',
  //   img: 'guinea_bissau.png',
  //   owner: 'IA',
  //   colour: '#FFFFFF',
  //   army: {
  //     divisions: 0,
  //     aircrafts: 0,
  //     warships: 0,
  //   },
  //   info: {
  //     continent: Continent.AFRICA,
  //   },
  //   levels: {
  //     tech_military: 10,
  //   },
  //   economy: {
  //     money: 0,
  //   },
  //   passives: [
  //     { type: CountryPassiveTypeV1.INCOMING, amount: 0 },
  //   ],
  //   provinces: [
  //     {
  //       id: null,
  //       name: 'PROVINCE_NAME',
  //       capital: false,
  //       details: {
  //         population: 1000000,
  //       },
  //       development: {
  //         production: 10,
  //         taxation: 10,
  //       },
  //       passives: [

  //       ],
  //       hasCoast: false,
  //     },
  //   ],
  //   allies: [],
  //   enemies: [],
  //   inWarWith: [],
  //   opinions: [],
  //   actions: [],
  //   messages: [],
  //   demands_rights: [],
  // },
  // {
  //   id: 'GN',
  //   tag: 'GIN',
  //   name: 'Guinea',
  //   img: 'guinea.png',
  //   owner: 'IA',
  //   colour: '#FFFFFF',
  //   army: {
  //     divisions: 0,
  //     aircrafts: 0,
  //     warships: 0,
  //   },
  //   info: {
  //     continent: Continent.AFRICA,
  //   },
  //   levels: {
  //     tech_military: 10,
  //   },
  //   economy: {
  //     money: 0,
  //   },
  //   passives: [
  //     { type: CountryPassiveTypeV1.INCOMING, amount: 0 },
  //   ],
  //   provinces: [
  //     {
  //       id: null,
  //       name: 'PROVINCE_NAME',
  //       capital: false,
  //       details: {
  //         population: 1000000,
  //       },
  //       development: {
  //         production: 10,
  //         taxation: 10,
  //       },
  //       passives: [

  //       ],
  //       hasCoast: false,
  //     },
  //   ],
  //   allies: [],
  //   enemies: [],
  //   inWarWith: [],
  //   opinions: [],
  //   actions: [],
  //   messages: [],
  //   demands_rights: [],
  // },
  // {
  //   id: 'SL',
  //   tag: 'SLE',
  //   name: 'Sierra Leone',
  //   img: 'sierra_leone.png',
  //   owner: 'IA',
  //   colour: '#FFFFFF',
  //   army: {
  //     divisions: 0,
  //     aircrafts: 0,
  //     warships: 0,
  //   },
  //   info: {
  //     continent: Continent.AFRICA,
  //   },
  //   levels: {
  //     tech_military: 10,
  //   },
  //   economy: {
  //     money: 0,
  //   },
  //   passives: [
  //     { type: CountryPassiveTypeV1.INCOMING, amount: 0 },
  //   ],
  //   provinces: [
  //     {
  //       id: null,
  //       name: 'PROVINCE_NAME',
  //       capital: false,
  //       details: {
  //         population: 1000000,
  //       },
  //       development: {
  //         production: 10,
  //         taxation: 10,
  //       },
  //       passives: [

  //       ],
  //       hasCoast: false,
  //     },
  //   ],
  //   allies: [],
  //   enemies: [],
  //   inWarWith: [],
  //   opinions: [],
  //   actions: [],
  //   messages: [],
  //   demands_rights: [],
  // },
  // {
  //   id: 'LR',
  //   tag: 'LBR',
  //   name: 'Liberia',
  //   img: 'liberia.png',
  //   owner: 'IA',
  //   colour: '#FFFFFF',
  //   army: {
  //     divisions: 0,
  //     aircrafts: 0,
  //     warships: 0,
  //   },
  //   info: {
  //     continent: Continent.AFRICA,
  //   },
  //   levels: {
  //     tech_military: 10,
  //   },
  //   economy: {
  //     money: 0,
  //   },
  //   passives: [
  //     { type: CountryPassiveTypeV1.INCOMING, amount: 0 },
  //   ],
  //   provinces: [
  //     {
  //       id: null,
  //       name: 'PROVINCE_NAME',
  //       capital: false,
  //       details: {
  //         population: 1000000,
  //       },
  //       development: {
  //         production: 10,
  //         taxation: 10,
  //       },
  //       passives: [

  //       ],
  //       hasCoast: false,
  //     },
  //   ],
  //   allies: [],
  //   enemies: [],
  //   inWarWith: [],
  //   opinions: [],
  //   actions: [],
  //   messages: [],
  //   demands_rights: [],
  // },
  {
    id: 'CI',
    tag: 'CIV',
    name: "Côte d'Ivoire",
    img: 'cote_divoire.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 32 }],
    provinces: [
      {
        id: 'CI',
        name: 'Yamoussoukro',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BF',
    tag: 'BFA',
    name: 'Burkina Faso',
    img: 'burkina_faso.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 22 }],
    provinces: [
      {
        id: 'BF',
        name: 'Ouagadougou',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'GH',
    tag: 'GHA',
    name: 'Ghana',
    img: 'ghana.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 31 }],
    provinces: [
      {
        id: 'GH',
        name: 'Accra',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  // {
  //   id: 'TG',
  //   tag: 'TGO',
  //   name: 'Togo',
  //   img: 'togo.png',
  //   owner: 'IA',
  //   colour: '#FFFFFF',
  //   army: {
  //     divisions: 0,
  //     aircrafts: 0,
  //     warships: 0,
  //   },
  //   info: {
  //     continent: Continent.AFRICA,
  //   },
  //   levels: {
  //     tech_military: 10,
  //   },
  //   economy: {
  //     money: 0,
  //   },
  //   passives: [
  //     { type: CountryPassiveTypeV1.INCOMING, amount: 0 },
  //   ],
  //   provinces: [
  //     {
  //       id: null,
  //       name: 'PROVINCE_NAME',
  //       capital: false,
  //       details: {
  //         population: 1000000,
  //       },
  //       development: {
  //         production: 10,
  //         taxation: 10,
  //       },
  //       passives: [

  //       ],
  //       hasCoast: false,
  //     },
  //   ],
  //   allies: [],
  //   enemies: [],
  //   inWarWith: [],
  //   opinions: [],
  //   actions: [],
  //   messages: [],
  //   demands_rights: [],
  // },
  {
    id: 'BJ',
    tag: 'BEN',
    name: 'Benin',
    img: 'benin.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 26 }],
    provinces: [
      {
        id: 'BJ',
        name: 'Porto-Novo',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'NG',
    tag: 'NGA',
    name: 'Nigeria',
    img: 'nigeria.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 28,
      tanks: 11,
      aircrafts: 21,
      warships: 22,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 781 }],
    provinces: [
      {
        id: 'NG',
        name: 'Abuja',
        capital: true,
        oilProduction: 75,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'ER',
    tag: 'ERI',
    name: 'Eritrea',
    img: 'eritrea.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'ER',
        name: 'Asmara',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'CM',
    tag: 'CMR',
    name: 'Cameroon',
    img: 'cameroon.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      aircrafts: 1,
      warships: 1,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 100 }],
    provinces: [
      {
        id: 'CM',
        name: 'Yaounde',
        capital: true,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'CF',
    tag: 'CAF',
    name: 'Central African Republic',
    img: 'central_african_republic.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 23 }],
    provinces: [
      {
        id: 'CF',
        name: 'Bangui',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'ET',
    tag: 'ETH',
    name: 'Ethiopia',
    img: 'ethiopia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 8,
      tanks: 1,
      aircrafts: 5,
      warships: 2,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 100 }],
    provinces: [
      {
        id: 'ET',
        name: 'Addis Ababa',
        capital: true,
        oilProduction: 49,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'DJ',
    tag: 'DJI',
    name: 'Djibouti',
    img: 'djibouti.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 22 }],
    provinces: [
      {
        id: 'DJ',
        name: 'Djibouti',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'GA',
    tag: 'GAB',
    name: 'Gabon',
    img: 'gabon.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'GA',
        name: 'Libreville',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'CD',
    tag: 'COD',
    name: 'Republic of Congo',
    img: 'republic_of_congo.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 4,
      tanks: 1,
      aircrafts: 1,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 35 }],
    provinces: [
      {
        id: 'CD',
        name: 'Kinshasa',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'CG',
        name: 'Brazzaville',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'UG',
    tag: 'UGA',
    name: 'Uganda',
    img: 'uganda.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'UG',
        name: 'Kampala',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'KE',
    tag: 'KEN',
    name: 'Kenya',
    img: 'kenya.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'KE',
        name: 'Nairobi',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'SO',
    tag: 'SOM',
    name: 'Somalia',
    img: 'somalia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'SO',
        name: 'Mogadishu',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'AO',
    tag: 'AGO',
    name: 'Angola',
    img: 'angola.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 8,
      tanks: 4,
      aircrafts: 3,
      warships: 1,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 150 }],
    provinces: [
      {
        id: 'AO',
        name: 'Luanda',
        capital: true,
        oilProduction: 78,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'ZM',
    tag: 'ZMB',
    name: 'Zambia',
    img: 'zambia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'ZM',
        name: 'Lusaka',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'ZW',
    tag: 'ZWE',
    name: 'Zimbabwe',
    img: 'zimbabwe.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'ZW',
        name: 'Harare',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'MW',
    tag: 'MWI',
    name: 'Malawi',
    img: 'malawi.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'MW',
        name: 'Lilongwe',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'MZ',
    tag: 'MOZ',
    name: 'Mozambique',
    img: 'mozambique.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 25 }],
    provinces: [
      {
        id: 'MZ',
        name: 'Maputo',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'BW',
    tag: 'BWA',
    name: 'Botswana',
    img: 'botswana.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 20 }],
    provinces: [
      {
        id: 'BW',
        name: 'Gaborone',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: false,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'NA',
    tag: 'NAM',
    name: 'Namibia',
    img: 'namibia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 30 }],
    provinces: [
      {
        id: 'NA',
        name: 'Windhoek',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'ZA',
    tag: 'ZAF',
    name: 'South Africa',
    img: 'south_africa.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 31,
      tanks: 15,
      aircrafts: 33,
      warships: 23,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 626 }],
    provinces: [
      {
        id: 'ZA-WC',
        name: 'Cape Town',
        capital: true,
        oilProduction: 66,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [{ type: 'increase_incoming', amount: 8 }],
        hasCoast: true,
      },
      {
        id: 'ZA-LP',
        name: 'Pretoria',
        capital: true,
        oilProduction: 36,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 18,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: false,
      },
      {
        id: 'ZA-FS',
        name: 'Bloemfontein',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'ZA-EC',
        name: 'Port Elizabeth',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'ZA-NC',
        name: 'Northern Cape',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ZA-NW',
        name: 'North West',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: false,
      },
      {
        id: 'ZA-MP',
        name: 'Lesotho',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 8,
          taxation: 8,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'TZ',
    tag: 'TZA',
    name: 'Tanzania',
    img: 'tanzania.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 29 }],
    provinces: [
      {
        id: 'TZ',
        name: 'Dodoma',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'MG',
    tag: 'MDG',
    name: 'Madagascar',
    img: 'madagascar.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 25 }],
    provinces: [
      {
        id: 'MG',
        name: 'Antananarivo',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  // Oceania
  {
    id: 'AU',
    tag: 'AUS',
    name: 'Australia',
    img: 'australia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.NEUTRAL,
    army: {
      divisions: 50,
      tanks: 28,
      aircrafts: 45,
      warships: 34,
    },
    info: {
      continent: Continent.OCEANIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 482 }],
    provinces: [
      {
        id: 'AU-NSW',
        name: 'Canberra',
        capital: true,
        oilProduction: 90,
        details: {
          population: 1000000,
        },
        development: {
          production: 41,
          taxation: 41,
        },
        passives: [{ type: 'increase_incoming', amount: 15 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AU-VIC',
        name: 'Victoria',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 36,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AU-TAS',
        name: 'Tasmania',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 35,
          taxation: 35,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AU-SA',
        name: 'South Australia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 28,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AU-WA',
        name: 'Western Australia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AU-NT',
        name: 'Northern Territory',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'AU-QLD',
        name: 'Queensland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 33,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'United Kingdom', opinion: 195 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },
  {
    id: 'NZ',
    tag: 'NZL',
    name: 'New Zealand',
    img: 'new_zealand.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.PACIFIC,
    army: {
      divisions: 11,
      tanks: 4,
      aircrafts: 4,
      warships: 12,
    },
    info: {
      continent: Continent.OCEANIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 0 }],
    provinces: [
      {
        id: 'NZ-AUK',
        name: 'Auckland',
        capital: true,
        oilProduction: 69,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 36,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NZ-TAS',
        name: 'Tasman District',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 28,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NZ-WTC',
        name: 'Canterbury',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'NZ-STL',
        name: 'Southland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 28,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'United Kingdom', opinion: 200 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  // Europe
  {
    id: 'PT',
    tag: 'PRT',
    name: 'Portugal',
    img: 'portugal.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.PACIFIC,
    army: {
      divisions: 14,
      tanks: 8,
      aircrafts: 13,
      warships: 37,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 316 },
      {
        type: CountryPassiveTypeV1.DISCOUNT_WARSHIPS,
        discountType: 'Warships',
        amount: 5,
      },
      { type: CountryPassiveTypeV1.DEFENSIVE_WAR, amount: 10 },
      {
        type: CountryPassiveTypeV1.FOCUS_CHANCE_DEFENSIVE,
        focusType: 'Defensive',
        amount: 60,
      },
      { type: CountryPassiveTypeV1.DEFENSIVE_WAR_LOSSES, amount: 20 },
    ],
    provinces: [
      {
        id: 'PT-15',
        img: 'lisbon.jpg',
        name: 'Lisboa',
        capital: true,
        oilProduction: 196,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 36,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'PT-07',
        name: 'Beja',
        capital: false,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'PT-02',
        name: 'Évora',
        capital: false,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PT-05',
        name: 'Castelo Branco',
        capital: false,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'PT-01',
        name: 'Porto',
        capital: false,
        oilProduction: 111,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 29,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PT-04',
        name: 'Bragança',
        capital: false,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 21,
        },
        passives: [],
      },
      {
        id: 'PT-13',
        name: 'Braga',
        capital: false,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 17,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [{ img: 'united_kingdom.png', name: 'United Kingdom' }],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'United Kingdom', opinion: 70 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'ES',
    tag: 'ESP',
    name: 'Spain',
    img: 'spain.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 40,
      tanks: 39,
      aircrafts: 35,
      warships: 60,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 24 },
      {
        type: CountryPassiveTypeV1.DISCOUNT_WARSHIPS,
        discountType: 'Warships',
        amount: 5,
      },
    ],
    provinces: [
      {
        id: 'ES-GA-N',
        name: 'Galicia del Norte',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ES-GA-S',
        name: 'Galicia del Sur',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ES-AS',
        name: 'Asturias',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
      },
      // {
      //   id: 'ES-CB',
      //   name: 'Cantabria',
      //   capital: false,
      //   details: {
      //     population: 1000000,
      //   },
      //   development: {
      //     production: 16,
      //     taxation: 16,
      //   },
      //   passives: [

      //   ],
      //   hasCoast: true,
      // },
      {
        id: 'ES-PV',
        name: 'Basque Country',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ES-NC',
        name: 'Navarra',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      // {
      //   id: 'ES-RI',
      //   name: 'La Rioja',
      //   capital: false,
      //   details: {
      //     population: 1000000,
      //   },
      //   development: {
      //     production: 15,
      //     taxation: 15,
      //   },
      //   passives: [

      //   ],
      // },
      {
        id: 'ES-AR',
        name: 'Aragon',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 29,
          taxation: 29,
        },
        passives: [],
      },
      {
        id: 'ES-CT',
        name: 'Catalonia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 36,
        },
        passives: [],
        hasCoast: true,
      },
      // {
      //   id: 'ES-IB-1',
      //   name: 'Balearic Islands 1',
      //   capital: false,
      //   details: {
      //     population: 1000000,
      //   },
      //   development: {
      //     production: 10,
      //     taxation: 10,
      //   },
      //   passives: [

      //   ],
      //   hasCoast: true,
      //   isIsland: true,
      // },
      // {
      //   id: 'ES-IB-2',
      //   name: 'Balearic Islands 2',
      //   capital: false,
      //   details: {
      //     population: 1000000,
      //   },
      //   development: {
      //     production: 13,
      //     taxation: 13,
      //   },
      //   passives: [

      //   ],
      //   hasCoast: true,
      //   isIsland: true,
      // },
      {
        id: 'ES-IB-3',
        name: 'Balearic Islands',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'ES-VC',
        name: 'Valencia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ES-CL-N',
        name: 'North Castille',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
      },
      {
        id: 'ES-CL-S',
        name: 'South Castille',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
      },
      {
        id: 'ES-CL-E',
        name: 'Leon',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 35,
          taxation: 35,
        },
        passives: [],
      },
      {
        id: 'ES-CM-N',
        img: 'madrid.jpg',
        name: 'Madrid',
        capital: true,
        oilProduction: 76,
        details: {
          population: 1000000,
        },
        development: {
          production: 43,
          taxation: 43,
        },
        passives: [{ type: 'increase_incoming', amount: 12 }],
      },
      {
        id: 'ES-EX',
        name: 'Extremadura',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'ES-CM-S',
        name: 'Castille-La Mancha',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 18,
        },
        passives: [],
      },
      {
        id: 'ES-MC',
        name: 'Murcia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 18,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ES-AN-2',
        name: 'Seville',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 29,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ES-AN-3',
        name: 'Granada',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'ES-AN',
        name: 'North Andalusia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'ES-AN-1',
        name: 'South Andalusia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing_of: ['Andorra'],
  },

  {
    id: 'FR',
    tag: 'FRA',
    name: 'France',
    img: 'france.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 75,
      tanks: 59,
      aircrafts: 61,
      warships: 72,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 843 }],
    provinces: [
      {
        id: 'FR-J',
        img: 'paris.jpg',
        name: 'Paris',
        capital: true,
        oilProduction: 86,
        details: {
          population: 1000000,
        },
        development: {
          production: 66,
          taxation: 73,
        },
        passives: [{ type: 'increase_incoming', amount: 15 }],
      },
      {
        id: 'FR-E',
        name: 'Bretagne',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'FR-R',
        name: 'Pays de la Loire',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-T',
        name: 'Poitou-Charentes',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-B',
        name: 'Aquitaine',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-N',
        name: 'Midi-Pyrenses',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'FR-K',
        name: 'Laquedoc-Roussillon',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-U',
        name: 'Provence',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-V',
        name: 'Rhone',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'FR-H',
        name: 'Corse',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'FR-C',
        name: 'Auvergne',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'FR-L',
        name: 'Limousin',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 22,
        },
        passives: [],
      },
      {
        id: 'FR-F',
        name: 'Centre',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 22,
        },
        passives: [],
      },
      {
        id: 'FR-P',
        name: 'Basse-Normandie',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 22,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-Q',
        name: 'Haute-Normandie',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 21,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-S',
        name: 'Picardie',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-O',
        name: 'Nord-Pas-de-Calais',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FR-D',
        name: 'Bourgogne',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 22,
        },
        passives: [],
      },
      {
        id: 'FR-G',
        name: 'Champangne-Ardenne',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 18,
        },
        passives: [],
      },
      {
        id: 'FR-M',
        name: 'Lorraine',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'FR-A',
        name: 'Alsace',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'FR-I',
        name: 'Franche-Comte',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'GF',
        name: 'French Guiana',
        capital: false,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 7,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing_of: ['Andorra'],
  },

  {
    id: 'AD',
    tag: 'AND',
    name: 'Andorra',
    img: 'andorra.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      aircrafts: 2,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 433 }],
    provinces: [
      {
        id: 'AD',
        img: 'pamplona.jpg',
        name: 'Pamplona',
        capital: true,
        oilProduction: 3,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [{ type: 'increase_incoming', amount: 2 }],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing: ['France', 'Spain'],
  },

  {
    id: 'LU',
    tag: 'LUX',
    name: 'Luxembourg',
    img: 'luxembourg.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 5,
      aircrafts: 5,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 238 }],
    provinces: [
      {
        id: 'LU',
        img: 'luxembourg_city.jpg',
        name: 'Luxembourg City',
        capital: true,
        oilProduction: 11,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [{ type: 'increase_incoming', amount: 7 }],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'BE',
    tag: 'BEL',
    name: 'Belgium',
    img: 'belgium.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 14,
      tanks: 8,
      aircrafts: 6,
      warships: 2,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 341 }],
    provinces: [
      {
        id: 'BE-VOV',
        name: 'Flanders',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 18,
        },
        passives: [],
      },
      {
        id: 'BE-VAN',
        img: 'brussels.jpg',
        name: 'Brussels',
        capital: true,
        oilProduction: 76,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
      },
      {
        id: 'BE-WNA',
        name: 'Liege',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'NL',
    tag: 'NLD',
    name: 'The Netherlands',
    img: 'netherlands.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 20,
      tanks: 14,
      aircrafts: 35,
      warships: 29,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 685 },
      {
        type: CountryPassiveTypeV1.DISCOUNT_WARSHIPS,
        discountType: 'Warships',
        amount: 3,
      },
    ],
    provinces: [
      {
        id: 'NL-FR',
        name: 'Groningen',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 24,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'NL-GE',
        name: 'Drenthe',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 28,
        },
        passives: [],
      },
      {
        id: 'NL-ZH',
        img: 'amsterdam.jpg',
        name: 'Amsterdam',
        capital: true,
        oilProduction: 96,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 38,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
      {
        id: 'NL-LI',
        name: 'Limburg',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 28,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'DE',
    tag: 'DEU',
    name: 'Germany',
    img: 'germany.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 64,
      tanks: 69,
      aircrafts: 75,
      warships: 41,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 1302 }],
    provinces: [
      {
        id: 'DE-BB',
        img: 'berlin.jpg',
        name: 'Berlin',
        capital: true,
        oilProduction: 116,
        details: {
          population: 1000000,
        },
        development: {
          production: 40,
          taxation: 40,
        },
        passives: [{ type: 'increase_incoming', amount: 13 }],
      },
      {
        id: 'DE-MV',
        name: 'Mecklenburg',
        capital: false,
        oilProduction: 219,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 17,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'DE-SH',
        name: 'Schleswig-Holstein',
        capital: false,
        oilProduction: 285,
        details: {
          population: 1000000,
        },
        development: {
          production: 21,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'DE-NI-W',
        name: 'West Lower Saxony',
        capital: false,
        oilProduction: 72,
        details: {
          population: 1000000,
        },
        development: {
          production: 21,
          taxation: 21,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'DE-NI-E',
        name: 'East Lower Saxony',
        capital: false,
        oilProduction: 21,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'DE-ST',
        name: 'Saxony Anhalt',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DE-SN',
        name: 'Saxony',
        capital: false,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 27,
        },
        passives: [],
      },
      {
        id: 'DE-TH',
        name: 'Thuringia',
        capital: false,
        oilProduction: 19,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 16,
        },
        passives: [],
      },
      {
        id: 'DE-HE',
        name: 'Hesse',
        capital: false,
        oilProduction: 23,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DE-RP',
        name: 'Nord Rhine-Westphalia',
        capital: false,
        oilProduction: 21,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'DE-NW',
        name: 'Rhineland-Palatinate',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DE-BW',
        name: 'Baden-Wurttemberg',
        capital: false,
        oilProduction: 11,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DE-BY-N',
        name: 'Nord Bavaria',
        capital: false,
        oilProduction: 23,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
      },
      {
        id: 'DE-BY-S',
        name: 'Sudbavaria',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 30,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'CH',
    tag: 'CHE',
    name: 'Switzerland',
    img: 'switzerland.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 26,
      tanks: 12,
      aircrafts: 38,
      warships: 22,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 494 },
      { type: CountryPassiveTypeV1.DEFENSIVE_WAR, amount: 20 },
      { type: CountryPassiveTypeV1.DEFENSIVE_WAR_LOSSES, amount: 20 },
    ],
    provinces: [
      {
        id: 'CH-VS',
        name: 'Vaud',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 35,
          taxation: 35,
        },
        passives: [],
      },
      {
        id: 'CH-SG',
        img: 'bern.jpg',
        name: 'Bern',
        capital: true,
        oilProduction: 98,
        details: {
          population: 1000000,
        },
        development: {
          production: 37,
          taxation: 40,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
      {
        id: 'CH-TI',
        name: 'Zurich',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 39,
          taxation: 39,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'AT',
    tag: 'AUT',
    name: 'Austria',
    img: 'austria.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 15,
      tanks: 8,
      aircrafts: 7,
      warships: 4,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 258 }],
    provinces: [
      {
        id: 'AT-5',
        name: 'Tyrol',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'AT-2',
        name: 'Carinthia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'AT-3',
        img: 'vienna.jpg',
        name: 'Vienna',
        capital: true,
        oilProduction: 74,
        details: {
          population: 1000000,
        },
        development: {
          production: 37,
          taxation: 37,
        },
        passives: [{ type: 'increase_incoming', amount: 8 }],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'CZ',
    tag: 'CZE',
    name: 'Czech Republic',
    img: 'czech_republic.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 18,
      tanks: 12,
      aircrafts: 21,
      warships: 10,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 375 }],
    provinces: [
      {
        id: 'CZ-JC',
        name: 'Karlovarsky',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'CZ-KR',
        img: 'prague.jpg',
        name: 'Prague',
        capital: true,
        oilProduction: 55,
        details: {
          population: 1000000,
        },
        development: {
          production: 34,
          taxation: 34,
        },
        passives: [{ type: 'increase_incoming', amount: 7 }],
      },
      {
        id: 'CZ-JM',
        name: 'Zlinsky',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'IT',
    tag: 'ITA',
    name: 'Italy',
    img: 'italy.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 45,
      tanks: 39,
      aircrafts: 39,
      warships: 55,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 771 }],
    provinces: [
      {
        id: 'IT-21',
        name: 'Piemonte',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 29,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'IT-32',
        name: 'Lombardia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 32,
        },
        passives: [],
      },
      {
        id: 'IT-36',
        name: 'Veneto',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'IT-34',
        name: 'Emilia-Romagna',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'IT-52',
        name: 'Toscana',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'IT-57',
        name: 'Lazio',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 21,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'IT-72',
        name: 'Basilicata',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 26,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'IT-82',
        name: 'Sicilia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 22,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'IT-88',
        name: 'Sardegna',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 24,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'IT_65',
        img: 'rome.jpg',
        name: 'Rome',
        capital: true,
        oilProduction: 110,
        details: {
          population: 1000000,
        },
        development: {
          production: 36,
          taxation: 38,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'SI',
    tag: 'SVN',
    name: 'Slovenia',
    img: 'slovenia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 4,
      tanks: 2,
      aircrafts: 3,
      warships: 1,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 245 }],
    provinces: [
      {
        id: 'SI',
        img: 'ljubljana.jpg',
        name: 'Ljubljana',
        capital: true,
        oilProduction: 46,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 11,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'SK',
    tag: 'SVK',
    name: 'Slovakia',
    img: 'slovakia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 14,
      tanks: 9,
      aircrafts: 17,
      warships: 5,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 413 }],
    provinces: [
      {
        id: 'SK',
        img: 'bratislava.jpg',
        name: 'Bratislava',
        capital: true,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 23,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'HR',
    tag: 'HRV',
    name: 'Croatia',
    img: 'croatia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 10,
      tanks: 7,
      aircrafts: 5,
      warships: 4,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 265 }],
    provinces: [
      {
        id: 'HR',
        img: 'zagreb.jpg',
        name: 'Zagreb',
        capital: true,
        oilProduction: 54,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 17,
        },
        passives: [{ type: 'increase_incoming', amount: 7 }],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'BA',
    tag: 'BIH',
    name: 'Bosnia and Herzegovina',
    img: 'bosnia_and_herzegovina.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 3,
      aircrafts: 1,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 215 }],
    provinces: [
      {
        id: 'BA',
        img: 'sarajevo.jpg',
        name: 'Sarajevo',
        capital: true,
        oilProduction: 46,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'HU',
    tag: 'HUN',
    name: 'Hungary',
    img: 'hungary.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 16,
      tanks: 20,
      aircrafts: 21,
      warships: 12,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 365 }],
    provinces: [
      {
        id: 'HU-PE',
        img: 'budapest.jpg',
        name: 'Budapest',
        capital: true,
        oilProduction: 89,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
      {
        id: 'HU-BK',
        name: 'Debrecen',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 26,
        },
        passives: [],
      },
      {
        id: 'HU-BZ',
        name: 'Szeged',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Turkey', opinion: -144 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'GE',
    tag: 'GEO',
    name: 'Georgia',
    img: 'georgia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 8,
      tanks: 3,
      aircrafts: 2,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 220 }],
    provinces: [
      {
        id: 'GE',
        img: 'tbilisi.jpg',
        name: 'Tbilisi',
        capital: true,
        oilProduction: 72,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: -66 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'IQ',
    tag: 'IRQ',
    name: 'Iraq',
    img: 'iraq.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 38,
      tanks: 29,
      aircrafts: 20,
      warships: 23,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 460 }],
    provinces: [
      {
        id: 'IQ-AN',
        name: 'Al-Anbar',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 2,
        },
        passives: [],
      },
      {
        id: 'IQ-NI',
        name: 'Ninawa',
        capital: false,
        oilProduction: 94,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'IQ-DA',
        name: 'Dohuk',
        capital: false,
        oilProduction: 96,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'IQ-AR',
        name: 'Arbil',
        capital: false,
        oilProduction: 88,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
      },
      {
        id: 'IQ-SU',
        name: 'As-Sulaymaniyah',
        capital: false,
        oilProduction: 54,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'IQ-SD',
        name: 'Salad ad-Din',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'IQ-DI',
        name: 'Diyala',
        capital: false,
        oilProduction: 50,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'IQ-BB',
        img: 'baghad.jpg',
        name: 'Baghdad',
        capital: true,
        oilProduction: 199,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 18,
        },
        passives: [{ type: 'increase_incoming', amount: 6 }],
      },
      {
        id: 'IQ-NA',
        name: 'An-Najaf',
        capital: false,
        oilProduction: 98,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'IQ-MU',
        name: 'Al-Muthannia',
        capital: false,
        oilProduction: 77,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'IQ-WA',
        name: 'Wasit',
        capital: false,
        oilProduction: 48,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
      },
      {
        id: 'IQ-MA',
        name: 'Maysan',
        capital: false,
        oilProduction: 35,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'IQ-DQ',
        name: 'Dhi-Qar',
        capital: false,
        oilProduction: 49,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'IQ-BA',
        name: 'Al-Basrah',
        capital: false,
        oilProduction: 32,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 10,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'RU',
    tag: 'RUS',
    name: 'Russia',
    img: 'russia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 190,
      tanks: 385,
      aircrafts: 182,
      warships: 185,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 2586.88 }],
    provinces: [
      {
        id: 'RU-KGD',
        img: 'kaliningrad.jpg',
        name: 'Kaliningrad',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-MUR',
        name: 'Murmansk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-NEN',
        name: 'Yekaterinburg',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-KR',
        name: 'Kortomuksha',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-LEN',
        name: 'St Petersburg',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-PSK',
        name: 'Pskov',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
      },
      {
        id: 'RU-NGR',
        name: 'Novigorod',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'RU-TVE',
        name: 'Tver',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-ARK',
        name: 'Mirny',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-KO',
        name: 'Karpogory',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'RU-KIR',
        name: 'Chim',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'RU-NIZ',
        name: 'Kirov',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-VLG',
        name: 'Velsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'RU-YAR',
        img: 'moscow.jpg',
        name: 'Moscow',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 46,
          taxation: 50,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
      {
        id: 'RU-SMO',
        name: 'Briansk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'RU-ORL',
        name: 'Oriol',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'RU-ME',
        name: 'Lipetsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'RU-TAM',
        name: 'Tambov',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'RU-KLU',
        name: 'Ryazan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'RU-MOS',
        name: 'Velsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'RU-PNZ',
        name: 'Syrzan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'RU-BEL',
        name: 'Belgorod',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-SAR',
        name: 'Saratov',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-ROS',
        name: 'Rostov-on-Don',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-VOR',
        name: 'Volgograd',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 17,
        },
        passives: [],
      },
      {
        id: 'RU-AST',
        name: 'Astrakhan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'RU-VGG',
        name: 'Elista',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-ULY',
        name: 'Makhachkala',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-KL',
        name: 'Krasnodar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-STA',
        name: 'Stavropol',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-KDA',
        name: 'Nalchik',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'RU-DA',
        name: 'Pyatigorsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-KC',
        name: 'Tolyatti',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-KOS',
        name: 'Buzuluk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'RU-SE',
        name: 'Grozny',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'RU-SAM',
        name: 'Samara',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-ORE',
        name: 'Orenburg',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-BA',
        name: 'Ufa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-CHE',
        name: 'Chelyabinsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-KGN',
        name: 'Kurgan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-TYU',
        name: 'Tyumen',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-OMS',
        name: 'Omsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-NVS',
        name: 'Novosibirsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-ALT',
        name: 'Barnaul',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-AL',
        name: 'Gorno-Altaysk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-TY',
        name: 'Kosh-Agach',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-KEM',
        name: 'Kemerovo',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-TOM',
        name: 'Tomsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-ME',
        name: 'Ulyanovsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-UD',
        name: 'Dimitrovgrad',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-PER',
        name: 'Perm',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-SVE',
        name: 'Nizhny Tagil',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-KHM',
        name: 'Sovetsky',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-YAN',
        name: 'Novy Urengoy',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-KYA',
        name: 'Siberia',
        capital: false,
        oilProduction: 515,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-SA',
        name: 'Yakutsk',
        capital: false,
        oilProduction: 395,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-CHU',
        name: 'Egvekinot',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-KAM',
        name: 'Klyuchi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-MAG',
        name: 'Magadan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-KHA',
        name: 'Komsomolsk-on-Amur',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-PRI',
        name: 'Vladivostok',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-SAK',
        name: 'Sakhalin',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'RU-YEV',
        name: 'Kyzyl',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-AMU',
        name: 'Trynda',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-ZAB',
        name: 'Chita',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-BU',
        name: 'Ulan Ude',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
      {
        id: 'RU-IRK',
        name: 'Bratsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'United States', opinion: -200 },
      { name: 'China', opinion: 180 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'IE',
    tag: 'IRL',
    name: 'Ireland',
    img: 'ireland.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.PACIFIC,
    army: {
      divisions: 8,
      tanks: 4,
      aircrafts: 6,
      warships: 11,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 451 }],
    provinces: [
      {
        id: 'IE-CW',
        img: 'dublin.jpg',
        name: 'Dublin',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 34,
          taxation: 34,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'IE-G',
        name: 'Donegal',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'IE-WD',
        name: 'Cork',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'United Kingdom', opinion: 190 }],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing: ['United Kingdom'],
  },

  {
    id: 'IS',
    tag: 'ISL',
    name: 'Iceland',
    img: 'iceland.png',
    owner: 'IA',
    colour: '#FFFFFF',
    personality: CountryPersonalityV1.PACIFIC,
    army: {
      divisions: 0,
      aircrafts: 0,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 204 }],
    provinces: [
      {
        id: 'IS',
        img: 'reykjavik.jpg',
        name: 'Reykjavik',
        capital: true,
        oilProduction: 66,
        details: {
          population: 300000,
        },
        development: {
          production: 33,
          taxation: 38,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'BG',
    tag: 'BGR',
    name: 'Bulgaria',
    img: 'bulgaria.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 11,
      tanks: 8,
      aircrafts: 11,
      warships: 8,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 269 }],
    provinces: [
      {
        id: 'BG',
        img: 'sofia.jpg',
        name: 'Sofia',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 29,
          taxation: 29,
        },
        passives: [{ type: 'increase_incoming', amount: 7 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Turkey', opinion: -120 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'AM',
    tag: 'ARM',
    name: 'Armenia',
    img: 'armenia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 6,
      tanks: 5,
      aircrafts: 4,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 232 }],
    provinces: [
      {
        id: 'AM',
        img: 'yerevan.jpg',
        name: 'Yerevan',
        capital: true,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 10,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: 87 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'AZ',
    tag: 'AZE',
    name: 'Azerbaijan',
    img: 'azerbaijan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 12,
      tanks: 8,
      aircrafts: 11,
      warships: 3,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 313 }],
    provinces: [
      {
        id: 'AZ',
        img: 'baku.jpg',
        name: 'Baku',
        capital: true,
        oilProduction: 54,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: 38 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  // Rahi
  {
    id: 'UA',
    tag: 'UKR',
    name: 'Ukraine',
    img: 'ukraine.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 31,
      tanks: 24,
      aircrafts: 32,
      warships: 30,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 273 },
      {
        type: CountryPassiveTypeV1.FOCUS_CHANCE_DEFENSIVE,
        focusType: 'Defensive',
        amount: 60,
      },
    ],
    provinces: [
      {
        id: 'UA-43',
        img: 'sevastopol_city.jpg',
        name: 'Crimea',
        description: 'Sevastopol City - Major port on the Black Sea.',
        capital: false,
        oilProduction: 215,
        details: {
          population: 1000000,
        },
        development: {
          production: 35,
          taxation: 35,
        },
        passives: [
          { type: 'increase_incoming', amount: 10 },
          {
            type: 'discount',
            item: 'warships',
            amount: 5,
            providedBy: 'UA-40',
          },
        ],
        hasCoast: true,
      },
      {
        id: 'UA-09',
        name: 'Donetsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 29,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'UA-65',
        name: 'Kherson',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'UA-53',
        name: 'Poltava',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 21,
          taxation: 21,
        },
        passives: [],
      },
      {
        id: 'UA-32',
        img: 'kiev.jpg',
        name: 'Kiev',
        capital: true,
        oilProduction: 94,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
      {
        id: 'UA-59',
        name: 'Sumy',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'UA-51',
        name: 'Odessa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'UA-77',
        name: 'Ternopil',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: -180 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'MD',
    tag: 'MDA',
    name: 'Moldova',
    img: 'moldova.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 6,
      tanks: 4,
      aircrafts: 4,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 242.75 }],
    provinces: [
      {
        id: 'MD',
        img: 'chinisau.jpg',
        name: 'Chisinau',
        capital: true,
        oilProduction: 7,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 3,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
      },
    ],
  },

  {
    id: 'RO',
    tag: 'ROU',
    name: 'Romania',
    img: 'romania.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 18,
      tanks: 20,
      aircrafts: 22,
      warships: 30,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 366 }],
    provinces: [
      {
        id: 'RO-BV',
        name: 'Suceava',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
      },
      {
        id: 'RO-BH',
        name: 'Bihor',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
      },
      {
        id: 'RO-BR',
        img: 'bucharest.jpg',
        name: 'Bucharest',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 34,
          taxation: 34,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'RO-TR',
        name: 'Brasov',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 30,
        },
        passives: [],
      },
      {
        id: 'RO-CS',
        name: 'Timis',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
    ],
  },

  {
    id: 'RS',
    tag: 'SRB',
    name: 'Serbia',
    img: 'serbia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 11,
      tanks: 6,
      aircrafts: 10,
      warships: 8,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 280 }],
    provinces: [
      {
        id: 'RS',
        img: 'belgrade.jpg',
        name: 'Belgrade',
        capital: true,
        oilProduction: 65,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
    ],
  },

  {
    id: 'XK',
    tag: 'KSV',
    name: 'Kosovo',
    img: 'kosovo.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 3,
      tanks: 2,
      aircrafts: 2,
      warships: 1,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 239.46 }],
    provinces: [
      {
        id: 'XK',
        img: 'pristina.jpg',
        name: 'Pristina',
        capital: true,
        oilProduction: 15,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
      },
    ],
  },

  {
    id: 'ME',
    tag: 'MNE',
    name: 'Montenegro',
    img: 'montenegro.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 4,
      tanks: 1,
      aircrafts: 2,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 224 }],
    provinces: [
      {
        id: 'ME',
        img: 'podgorica.jpg',
        name: 'Podgorica',
        capital: true,
        oilProduction: 20,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
    ],
  },

  {
    id: 'AL',
    tag: 'ALB',
    name: 'Albania',
    img: 'albania.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 5,
      tanks: 1,
      aircrafts: 3,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 234 }],
    provinces: [
      {
        id: 'AL',
        img: 'tirana.jpg',
        name: 'Tirana',
        capital: true,
        oilProduction: 25,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: true,
      },
    ],
  },

  {
    id: 'MK',
    tag: 'MKD',
    name: 'North Macedonia',
    img: 'macedonia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 4,
      tanks: 1,
      aircrafts: 2,
      warships: 0,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 228 }],
    provinces: [
      {
        id: 'MK',
        img: 'skopje.jpg',
        name: 'Skopje',
        capital: true,
        oilProduction: 16,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
      },
    ],
  },

  {
    id: 'GR',
    tag: 'GRC',
    name: 'Greece',
    img: 'greece.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 15,
      tanks: 32,
      aircrafts: 29,
      warships: 41,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 395 },
      {
        type: CountryPassiveTypeV1.DISCOUNT_WARSHIPS,
        discountType: 'Warships',
        amount: 8,
      },
    ],
    provinces: [
      {
        id: 'GR-D',
        name: 'Epirus',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GR-B',
        name: 'Central Macedonia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GR-A',
        name: 'East Macedonia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GR-H',
        name: 'Central Greece',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 27,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GR-G',
        name: 'West Greece',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GR-J',
        name: 'Peloponnese',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 19,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GR-M',
        name: 'Creta',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'GR-I',
        img: 'athens.jpg',
        name: 'Athens',
        capital: true,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 32,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
      {
        id: 'GR-F',
        name: 'Ionian Islands',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'GR-K',
        name: 'North Aegian',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
      {
        id: 'GR-L',
        name: 'South Aegian',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
    ],
    opinions: [{ name: 'Turkey', opinion: -187 }],
  },

  {
    id: 'TK',
    tag: 'TUR',
    name: 'Turkey',
    img: 'turkey.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 65,
      tanks: 94,
      aircrafts: 51,
      warships: 50,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 610 }],
    provinces: [
      {
        id: 'TR-22_20',
        name: 'Edirne',
        capital: false,
        oilProduction: 49,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-22_21',
        img: 'istanbul.jpg',
        name: 'Istanbul',
        capital: true,
        oilProduction: 89,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 37,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'TR-10',
        name: 'Bursa',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'TR-81',
        name: 'Bolu',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-20',
        name: 'Denizli',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'TR-07',
        name: 'Antalya',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-26',
        name: 'Konya',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'TR-70',
        name: 'Mersin',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-44',
        name: 'Adana',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'TR-19',
        name: 'Yozgat',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
      },
      {
        id: 'TR-78',
        name: 'Kastamonu',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-52',
        name: 'Ordu',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 17,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-31',
        name: 'Kilis',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-72',
        name: 'Tunceli',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'TR-28',
        name: 'Trabzon',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-04',
        name: 'Erzurum',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'TR-13',
        name: 'Bitlis',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'TR-35',
        name: 'Balıkesir',
        capital: false,
        oilProduction: 12,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    opinions: [{ name: 'Greece', opinion: -188 }],
  },

  {
    id: 'SY',
    tag: 'SYR',
    name: 'Syria',
    img: 'syria.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 24,
      tanks: 16,
      aircrafts: 11,
      warships: 6,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 276 }],
    provinces: [
      {
        id: 'SY-HA',
        name: 'Al Hasakah',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 2,
        },
        passives: [],
      },
      {
        id: 'SY-RA',
        name: 'Ar Raqqah',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 5,
        },
        passives: [],
      },
      {
        id: 'SY-HL',
        name: 'Halab',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 6,
        },
        passives: [],
      },
      {
        id: 'SY-DY',
        name: 'Dayr az Zawr',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'SY-HI',
        name: 'Hims',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 5,
        },
        passives: [],
      },
      {
        id: 'SY-HM',
        name: 'Hamah',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 5,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SY-RD',
        img: 'damascus.jpg',
        name: 'Damascus',
        capital: true,
        oilProduction: 185,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
      },
      {
        id: 'SY-SU',
        name: 'As Suwayda',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
      },
      {
        id: 'SY-DR',
        name: 'Dara',
        capital: false,
        oilProduction: 95,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
      },
    ],
  },

  {
    id: 'LB',
    tag: 'LBN',
    name: 'Lebanon',
    img: 'lebanon.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 4,
      tanks: 3,
      aircrafts: 2,
      warships: 1,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 235 }],
    provinces: [
      {
        id: 'LB',
        img: 'beirut.jpg',
        name: 'Beirut',
        capital: true,
        oilProduction: 23,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
      },
    ],
  },

  {
    id: 'IL',
    tag: 'ISR',
    name: 'Israel',
    img: 'israel.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 30,
      tanks: 49,
      aircrafts: 39,
      warships: 45,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 957 }],
    provinces: [
      {
        id: 'IL',
        img: 'tel_aviv.jpg',
        name: 'Tel Aviv',
        capital: true,
        oilProduction: 25,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [{ type: 'increase_incoming', amount: 9 }],
        hasCoast: true,
      },
    ],
  },

  {
    id: 'PS',
    tag: 'PSE',
    name: 'Palestine',
    img: 'palestine.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 13,
      tanks: 5,
      aircrafts: 8,
      warships: 0,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 270.39 }],
    provinces: [
      {
        id: 'PS',
        img: 'jerusalem.jpg',
        name: 'Jerusalem',
        capital: true,
        oilProduction: 23,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 7,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
      },
    ],
  },

  {
    id: 'JO',
    tag: 'JOR',
    name: 'Jordan',
    img: 'jordan.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 12,
      tanks: 6,
      aircrafts: 3,
      warships: 2,
    },
    info: {
      continent: Continent.ASIA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 255 }],
    provinces: [
      {
        id: 'JO',
        img: 'amman.jpg',
        name: 'Amman',
        capital: true,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 11,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
      },
    ],
  },

  // Jh
  {
    id: 'GB',
    tag: 'GBR',
    name: 'United Kingdom',
    img: 'united_kingdom.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 68,
      tanks: 55,
      aircrafts: 63,
      warships: 115,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 1048 },
      {
        type: CountryPassiveTypeV1.DISCOUNT_WARSHIPS,
        discountType: 'Warships',
        amount: 10,
      },
      {
        type: CountryPassiveTypeV1.INCREASE_POWER,
        increaseType: 'Warships',
        amount: 10,
      },
      {
        type: CountryPassiveTypeV1.ARMY_FOCUS_CHANCE,
        focusType: 'warships',
        amount: 70,
      },
      {
        type: CountryPassiveTypeV1.SHOP_BUY_CHANCE_WARSHIPS,
        item: 'warships',
        amount: 20,
      },
    ],
    provinces: [
      {
        id: 'GB-UKI',
        img: 'london.jpg',
        name: 'London',
        capital: true,
        oilProduction: 115,
        details: {
          population: 1000000,
        },
        development: {
          production: 66,
          taxation: 74,
        },
        passives: [{ type: 'increase_incoming', amount: 20 }],
      },
      {
        id: 'GB-UKJ',
        name: 'Sussex',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [],
      },
      {
        id: 'GB-UKH',
        name: 'Essex',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 30,
        },
        passives: [],
      },
      {
        id: 'GB-UKF',
        name: 'Nottinghamshire',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 27,
        },
        passives: [],
      },
      {
        id: 'GB-UKG',
        name: 'Staffordshire',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 24,
        },
        passives: [],
      },
      {
        id: 'GB-UKL',
        name: 'Wales',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 29,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'GB-UKK',
        name: 'Cornwall',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GB-UKE',
        name: 'Yorkshire and the Humber',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 27,
        },
        passives: [],
      },
      {
        id: 'GB-UKC',
        name: 'Northumberland',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 26,
        },
        passives: [],
      },
      {
        id: 'GB-UKD',
        name: 'Cumbria',
        capital: false,
        oilProduction: 22,
        details: {
          population: 1000000,
        },
        development: {
          production: 29,
          taxation: 30,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'GB-UKM',
        name: 'Scotland',
        capital: false,
        oilProduction: 710,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'GB-UKN',
        name: 'Northern Ireland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'GB-UKD_24',
        name: 'Lanchashire',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'FK',
        name: 'Falkland Islands',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
        isIsland: true,
      },
    ],
    allies: [{ img: 'portugal.png', name: 'Portugal' }],
    enemies: [],
    inWarWith: [],
    opinions: [
      { name: 'Ireland', opinion: 135 },
      { name: 'Portugal', opinion: 80 },
      { name: 'New Zealand', opinion: 200 },
      { name: 'Canada', opinion: 195 },
      { name: 'Australia', opinion: 180 },
      { name: 'United States', opinion: 100 },
    ],
    actions: [],
    messages: [],
    demands_rights: [],
    guaranteeing_of: ['Ireland'],
  },

  {
    id: 'DK',
    tag: 'DNK',
    name: 'Denmark',
    img: 'denmark.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 8,
      tanks: 5,
      aircrafts: 18,
      warships: 20,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 355 }],
    provinces: [
      {
        id: 'DK-83',
        name: 'Syddanmark',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 29,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'DK-84',
        img: 'copenhagen.jpg',
        name: 'Copenhagen',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 32,
          taxation: 32,
        },
        passives: [{ type: 'increase_incoming', amount: 12 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'DK-82',
        name: 'Midtjylland',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 26,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'DK-81',
        name: 'Nordjylland',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'GL',
        name: 'Greenland',
        capital: false,
        oilProduction: 33,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'NO',
    tag: 'NOR',
    name: 'Norway',
    img: 'norway.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 12,
      tanks: 8,
      aircrafts: 30,
      warships: 41,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 476 }],
    provinces: [
      {
        id: 'NO-07',
        img: 'oslo.jpg',
        name: 'Oslo',
        capital: true,
        oilProduction: 100,
        details: {
          population: 1000000,
        },
        development: {
          production: 35,
          taxation: 35,
        },
        passives: [{ type: 'increase_incoming', amount: 12 }],
        hasCoast: true,
      },
      {
        id: 'NO-05',
        name: 'Oppland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 28,
        },
        passives: [],
      },
      {
        id: 'NO-20',
        name: 'Finmark',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NO-19',
        name: 'Troms',
        capital: false,
        oilProduction: 619,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NO-04',
        name: 'Hedmark',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 22,
        },
        passives: [],
      },
      {
        id: 'NO-14',
        name: 'Sogn og Fjordane',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NO-12',
        name: 'Rogaland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 9,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NO-16',
        name: 'Sor Trondelag',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NO-17',
        name: 'Nord Trondelag',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'NO-18',
        name: 'Nordland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'NO-06',
        name: 'Buskerud',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 32,
        },
        passives: [],
      },
      {
        id: 'NO-08',
        name: 'Telemark',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 38,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'NO-09',
        name: 'Hordaland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 31,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SJ',
        name: 'Svalbard and Jan Mayen',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'PL',
    tag: 'POL',
    name: 'Poland',
    img: 'poland.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 38,
      tanks: 45,
      aircrafts: 40,
      warships: 27,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 260 }],
    provinces: [
      {
        id: 'PL-WN',
        name: 'Warmińsko-Mazurskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PL-MZ',
        img: 'warsaw.jpg',
        name: 'Warsaw',
        capital: true,
        oilProduction: 99,
        details: {
          population: 1000000,
        },
        development: {
          production: 38,
          taxation: 38,
        },
        passives: [{ type: 'increase_incoming', amount: 11 }],
      },
      {
        id: 'PL-KP',
        name: 'Kujawsko-Pomorskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 16,
        },
        passives: [],
      },
      {
        id: 'PL-WP',
        name: 'Wielkopolskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'PL-ZP',
        name: 'Zachodniopomorskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PL-PK',
        name: 'Podkarpackie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 23,
        },
        passives: [],
      },
      {
        id: 'PL-DS',
        name: 'Opolskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 24,
        },
        passives: [],
      },
      {
        id: 'PL-LD',
        name: 'Lodzkie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'PL-PM',
        name: 'Pomorskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 27,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'PL-LB',
        name: 'Lubuskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 23,
        },
        passives: [],
      },
      {
        id: 'PL-SL',
        name: 'Malopolskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 21,
        },
        passives: [],
      },
      {
        id: 'PL-LU',
        name: 'Lubelskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 22,
        },
        passives: [],
      },
      {
        id: 'PL-PD',
        name: 'Podlaskie',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 20,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'BY',
    tag: 'BLR',
    name: 'Belarus',
    img: 'belarus.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 16,
      tanks: 20,
      aircrafts: 23,
      warships: 11,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [
      { type: CountryPassiveTypeV1.INCOMING, amount: 304 },
      {
        type: CountryPassiveTypeV1.FOCUS_CHANCE_DEFENSIVE,
        focusType: 'Defensive',
        amount: 60,
      },
    ],
    provinces: [
      {
        id: 'BY-MI',
        img: 'minsk.jpg',
        name: 'Minsk',
        capital: true,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
      },
      {
        id: 'BY-BR',
        name: 'Hrodzen',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'BY-VI',
        name: 'Vitsyebsk',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'BY-HO',
        name: 'Homyel',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: -125 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'LT',
    tag: 'LTU',
    name: 'Lithuania',
    img: 'lithuania.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 6,
      tanks: 4,
      aircrafts: 3,
      warships: 2,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 258 }],
    provinces: [
      {
        id: 'LT',
        img: 'vilnius.jpg',
        name: 'Vilnius',
        capital: true,
        oilProduction: 75,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: -148 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'LV',
    tag: 'LVA',
    name: 'Latvia',
    img: 'latvia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 3,
      tanks: 2,
      aircrafts: 2,
      warships: 1,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 212 }],
    provinces: [
      {
        id: 'LV',
        img: 'riga.jpg',
        name: 'Riga',
        capital: true,
        oilProduction: 75,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 18,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: -132 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'EE',
    tag: 'EST',
    name: 'Estonia',
    img: 'estonia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 4,
      tanks: 2,
      aircrafts: 2,
      warships: 1,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 114 }],
    provinces: [
      {
        id: 'EE',
        img: 'tallinn.jpg',
        name: 'Tallinn',
        capital: true,
        oilProduction: 65,
        details: {
          population: 1000000,
        },
        development: {
          production: 33,
          taxation: 33,
        },
        passives: [{ type: 'increase_incoming', amount: 12 }],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Russia', opinion: -179 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'FI',
    tag: 'FIN',
    name: 'Finland',
    img: 'finland.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 14,
      tanks: 22,
      aircrafts: 23,
      warships: 16,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 344 }],
    provinces: [
      {
        id: 'FI-10',
        name: 'Lapland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 1,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FI-14',
        name: 'Northern Ostrobothnia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 12,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FI-05',
        name: 'Kainuu',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'FI-03',
        name: 'Southern Ostrobothnia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'FI-08',
        name: 'Central Finland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 17,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'FI-15',
        name: 'Nothern Savonia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'FI-13',
        name: 'North Karelia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'FI-17',
        name: 'Satakunta',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'FI-04',
        name: 'Southern Savonia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 11,
        },
        passives: [],
      },
      {
        id: 'FI-11',
        name: 'Pirkanmaa',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'FI-16',
        img: 'helsinki.jpg',
        name: 'Helsinki',
        capital: true,
        oilProduction: 97,
        details: {
          population: 1000000,
        },
        development: {
          production: 39,
          taxation: 39,
        },
        passives: [{ type: 'increase_incoming', amount: 12 }],
        hasCoast: true,
      },
      {
        id: 'FI-19',
        name: 'Finland Proper',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 16,
          taxation: 19,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'SE',
    tag: 'SWE',
    name: 'Sweden',
    img: 'sweden.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 17,
      tanks: 29,
      aircrafts: 46,
      warships: 24,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 88 }],
    provinces: [
      {
        id: 'SE-BD',
        name: 'Norrbotten',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 16,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SE-AC',
        name: 'Vasterbotten',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SE-U',
        name: 'Vastmanland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 23,
          taxation: 14,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SE-Z',
        name: 'Jamtland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
      },
      {
        id: 'SE-X',
        name: 'Gavleborg',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SE-W',
        name: 'Dalarna',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 25,
        },
        passives: [],
      },
      {
        id: 'SE-D',
        img: 'stockholm.jpg',
        name: 'Stockholm',
        capital: true,
        oilProduction: 85,
        details: {
          population: 1000000,
        },
        development: {
          production: 39,
          taxation: 40,
        },
        passives: [{ type: 'increase_incoming', amount: 12 }],
        hasCoast: true,
      },
      {
        id: 'SE-E',
        name: 'Sodermanland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 22,
          taxation: 22,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SE-S',
        name: 'Varmland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
      },
      {
        id: 'SE-O',
        name: 'Vastra Gotaland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 24,
          taxation: 24,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SE-H',
        name: 'Kalmar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 26,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'SE-F',
        name: 'Jonkoping',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'SE-K',
        name: 'Blekinge',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 19,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'SE-I',
        name: 'Gotland',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  // deyvid again
  {
    id: 'CY',
    tag: 'CYP',
    name: 'Cyprus',
    img: 'cyprus.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 1,
      tanks: 3,
      aircrafts: 1,
      warships: 3,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 241 }],
    provinces: [
      {
        id: 'CY',
        img: 'nicosia.jpg',
        name: 'Nicosia',
        capital: true,
        oilProduction: 37,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 14,
        },
        passives: [{ type: 'increase_incoming', amount: 3 }],
        hasCoast: true,
        isIsland: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [{ name: 'Turkey', opinion: -200 }],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'EG',
    tag: 'EGY',
    name: 'Egypt',
    img: 'egypt.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 79,
      tanks: 75,
      aircrafts: 58,
      warships: 40,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 668 }],
    provinces: [
      {
        id: 'EG-DK',
        img: 'cairo.jpg',
        name: 'Cairo',
        capital: true,
        oilProduction: 116,
        details: {
          population: 1000000,
        },
        development: {
          production: 34,
          taxation: 33,
        },
        passives: [{ type: 'increase_incoming', amount: 10 }],
        hasCoast: true,
      },
      {
        id: 'EG-SIN',
        name: 'Shamal Sina',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 23,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'EG-JS',
        name: 'Janub Sina',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 20,
          taxation: 23,
        },
        passives: [],
      },
      {
        id: 'EG-C',
        name: 'Al Bahr al Ahmar',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 18,
          taxation: 20,
        },
        passives: [],
      },
      {
        id: 'EG-KFS',
        name: 'Al Ismailiyah',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 26,
          taxation: 20,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'EG-BH',
        name: 'Al Buhayrah',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 25,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'EG-ALX',
        name: 'Al Iskandariyah',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 30,
          taxation: 27,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'EG-MT',
        name: 'Matruh',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 19,
          taxation: 25,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'EG-FYM',
        name: 'Al Jizah',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 19,
        },
        passives: [],
      },
      {
        id: 'EG-WAD',
        name: 'Al Wadi al Jadid',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
      },
      {
        id: 'EG-ASN',
        name: 'Aswan',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 9,
          taxation: 9,
        },
        passives: [],
      },
      {
        id: 'EG-BA',
        name: 'Suhaj',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 6,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'EG-MN',
        name: 'Al Minya',
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 12,
        },
        passives: [],
      },
      {
        id: 'EG-HT',
        name: "Hala'Ib Triangle",
        capital: false,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 5,
          taxation: 7,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'LY',
    tag: 'LBY',
    name: 'Libya',
    img: 'libya.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 11,
      tanks: 5,
      aircrafts: 4,
      warships: 5,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 271 }],
    provinces: [
      {
        id: 'LBY2966',
        img: 'tripoli.jpg',
        name: 'Tripoli',
        capital: true,
        oilProduction: 200,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: true,
      },
      {
        id: 'LBY2976',
        name: 'Alzintan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'LBY2970',
        name: 'Zilten',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'LBY2967',
        name: 'Sabha',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'LBY2964',
        name: 'Waddan',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 2,
        },
        passives: [],
      },
      {
        id: 'LBY2985',
        name: 'Sirte',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'LBY2981',
        name: 'Benghazi',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'LBY2983',
        name: 'Ajdabiya',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'LBY2987',
        name: 'Maradah',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'LBY2882',
        name: 'Awbari',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
      },
      {
        id: 'LBY2969',
        name: 'Murzuq',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
      },
      {
        id: 'LBY2965',
        name: 'Kufra',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 6,
          taxation: 6,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'TN',
    tag: 'TUN',
    name: 'Tunisia',
    img: 'tunisia.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 13,
      tanks: 4,
      aircrafts: 2,
      warships: 1,
    },
    info: {
      continent: Continent.EUROPE,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 242 }],
    provinces: [
      {
        id: 'TUN99',
        img: 'tunis.jpg',
        name: 'Tunis',
        capital: true,
        oilProduction: 45,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [{ type: 'increase_incoming', amount: 4 }],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'TUN113',
        name: 'Kasserine',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
      },
      {
        id: 'TUN114',
        name: 'Sfax',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
      {
        id: 'TUN101',
        name: 'Gabes',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 2,
          taxation: 2,
        },
        passives: [],
      },
      {
        id: 'TUN96',
        name: 'Tatouine',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 1,
          taxation: 1,
        },
        passives: [],
        hasCoast: true,
        hasIslands: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'DZ',
    tag: 'DZA',
    name: 'Algeria',
    img: 'algeria.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 29,
      tanks: 16,
      aircrafts: 30,
      warships: 28,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 561 }],
    provinces: [
      {
        id: 'DZA2195',
        img: 'algiers.jpg',
        name: 'Algiers',
        capital: true,
        oilProduction: 66,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: true,
      },
      {
        id: 'DZA2212',
        name: 'Blida',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DZA2215',
        name: 'Bouiria',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DZA2208',
        name: 'Bejaia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'DZA2165',
        name: 'Jijel',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'DZA2216',
        name: "M'Sila",
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DZA2219',
        name: 'Batna',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 15,
        },
        passives: [],
      },
      {
        id: 'DZA2191',
        name: 'El Oued',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 14,
          taxation: 14,
        },
        passives: [],
      },
      {
        id: 'DZA2192',
        name: 'Ouargla',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 12,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'DZA2143',
        name: 'Ghardaia',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 11,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'DZA2148',
        name: 'Bechar',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 15,
          taxation: 16,
        },
        passives: [],
      },
      {
        id: 'DZA2149',
        name: 'Naama',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
      },
      {
        id: 'DZA2144',
        name: 'Oran',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 10,
          taxation: 10,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'DZA2189',
        name: 'Tamanghasset',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 7,
          taxation: 7,
        },
        passives: [],
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },

  {
    id: 'MA',
    tag: 'MAR',
    name: 'Morrocco',
    img: 'morrocco.png',
    owner: 'IA',
    colour: '#FFFFFF',
    army: {
      divisions: 37,
      tanks: 27,
      aircrafts: 15,
      warships: 19,
    },
    info: {
      continent: Continent.AFRICA,
    },
    levels: {
      tech_military: 10,
    },
    economy: {
      money: 0,
    },
    passives: [{ type: CountryPassiveTypeV1.INCOMING, amount: 388 }],
    provinces: [
      {
        id: 'MA-10',
        img: 'rabat.jpg',
        name: 'Rabat',
        capital: true,
        oilProduction: 67,
        details: {
          population: 1000000,
        },
        development: {
          production: 28,
          taxation: 28,
        },
        passives: [{ type: 'increase_incoming', amount: 5 }],
        hasCoast: true,
      },
      {
        id: 'MA-01',
        name: 'Tanger',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MA-05',
        name: 'Taza',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MA-04',
        name: 'Boulemane',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MA-06',
        name: 'Meknes',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
      },
      {
        id: 'MA-13',
        name: 'Marrakech',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MA-14',
        name: 'Guelmin',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 13,
          taxation: 13,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MA-15',
        name: 'Laayoune',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 4,
          taxation: 4,
        },
        passives: [],
        hasCoast: true,
      },
      {
        id: 'MA-16',
        name: 'Dakhla',
        capital: false,
        details: {
          population: 1000000,
        },
        development: {
          production: 3,
          taxation: 3,
        },
        passives: [],
        hasCoast: true,
      },
    ],
    allies: [],
    enemies: [],
    inWarWith: [],
    opinions: [],
    actions: [],
    messages: [],
    demands_rights: [],
  },
];
