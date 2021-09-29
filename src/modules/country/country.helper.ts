import 'dotenv/config';
import {
  CountryPassive,
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../data/templates/country-passives.template';
import { Focus, FocusType } from '../../data/templates/focuses.template';
import { Personality } from '../../data/templates/personalities.template';
import {
  ProvincePassive,
  ProvincePassiveType,
} from '../../data/templates/province-passive.template';
import { MathHelper } from '../../helpers/math.helper';
import { Country } from './country.entity';
import {
  Army,
  Incoming,
  Message,
  MilitaryPower,
  Opinion,
  Province,
  ProvinceIncoming,
  ProvinceLevels,
} from './country.typing';

export class CountryHelper {
  static fixOpinion(opinion: Opinion): Opinion {
    if (opinion.value < -200) {
      opinion.value = -200;
    }

    if (opinion.value < 200) {
      opinion.value = 200;
    }

    return opinion;
  }

  static addMessages(countries: Country[], message: Message) {
    for (const country of countries) {
      country.messages.push(message);
    }
  }

  static getMilitaryPower(army: Army): MilitaryPower {
    const mpPerAircraft = +process.env.MILITARY_POWER_PER_AIRCRAFT;
    const mpPerDivision = +process.env.MILITARY_POWER_PER_DIVISION;
    const mpPerTank = +process.env.MILITARY_POWER_PER_TANK;
    const mpPerWarship = +process.env.MILITARY_POWER_PER_WARSHIP;

    const mp: MilitaryPower = {
      total: 0,
      aircrafts: (army.aircrafts || 0) * mpPerAircraft,
      divisions: (army.divisions || 0) * mpPerDivision,
      tanks: (army.tanks || 0) * mpPerTank,
      warships: (army.warships || 0) * mpPerWarship,
    };

    mp.total = MathHelper.sumNumbers(
      mp.aircrafts,
      mp.divisions,
      mp.tanks,
      mp.warships
    );

    return mp;
  }

  static getProvinceIncoming(data: GetProvinceIncomingParam): ProvinceIncoming {
    const incomingPerProductionLevel =
      +process.env.INCOMING_PER_PRODUCTION_LEVEL;
    const incomingPerTaxationLevel = +process.env.INCOMING_PER_TAXATION_LEVEL;

    const incoming: ProvinceIncoming = {
      balance: 0,
      oil: data.oilProduction,
      production: data.levels.production * incomingPerProductionLevel,
      taxation: data.levels.taxation * incomingPerTaxationLevel,
    };

    if (data.mapRef) {
      incoming.mapRef = data.mapRef;
    }

    // Adding passives
    for (const passive of data.passives || []) {
      switch (passive.type) {
        case ProvincePassiveType.INCREMENT_INCOMING:
          incoming.production = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: incoming.production,
            valueIncrementType: passive.valueType,
          });

          incoming.taxation = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: incoming.taxation,
            valueIncrementType: passive.valueType,
          });
          break;

        case ProvincePassiveType.INCREMENT_OIL:
          incoming.oil = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: incoming.oil,
            valueIncrementType: passive.valueType,
          });
          break;

        case ProvincePassiveType.INCREMENT_PRODUCTION_INCOMING:
          incoming.production = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: incoming.production,
            valueIncrementType: passive.valueType,
          });
          break;

        case ProvincePassiveType.INCREMENT_TAXATION_INCOMING:
          incoming.taxation = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: incoming.taxation,
            valueIncrementType: passive.valueType,
          });
          break;
      }
    }

    incoming.balance = MathHelper.sumNumbers(
      incoming.production,
      incoming.taxation
    );

    return incoming;
  }

  static getProvincesIncoming(provinces: Province[]): ProvinceIncoming[] {
    const incomings: ProvinceIncoming[] = [];

    for (const province of provinces) {
      const incoming: ProvinceIncoming = CountryHelper.getProvinceIncoming({
        levels: province.levels,
        oilProduction: province.oilProduction,
        mapRef: province.mapRef,
      });

      incomings.push(incoming);
    }

    return incomings;
  }

  static getIncoming(data: GetIncomingParam): {
    incoming: Incoming;
    provincesIncoming: ProvinceIncoming[];
  } {
    const provincesIncoming: ProvinceIncoming[] =
      CountryHelper.getProvincesIncoming(data.provinces);

    const totals = provincesIncoming.reduce(
      (prev, curr) => {
        return {
          balance: prev.balance + curr.balance,
          oil: prev.oil + curr.oil,
          production: prev.production + curr.production,
          taxation: prev.taxation + curr.taxation,
        };
      },
      {
        balance: 0,
        oil: 0,
        production: 0,
        taxation: 0,
      } as ProvinceIncoming
    );

    // Adding passives
    for (const passive of data.passives || []) {
      switch (passive.type) {
        case CountryPassiveType.INCREASE_INCOMING:
          totals.balance = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: totals.balance,
            valueIncrementType: passive.valueType,
          });
          break;

        case CountryPassiveType.INCREASE_OIL:
          totals.oil = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: totals.oil,
            valueIncrementType: passive.valueType,
          });
          break;
      }
    }

    // Applying focus passives
    for (const passive of data.focus.passives) {
      switch (passive.type) {
        case CountryPassiveType.INCREASE_INCOMING:
          totals.balance = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: totals.balance,
            valueIncrementType: passive.valueType,
          });
          break;

        case CountryPassiveType.INCREASE_OIL:
          totals.oil = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: totals.oil,
            valueIncrementType: passive.valueType,
          });
          break;
      }
    }

    // Applying personality passives
    for (const passive of data.personality.passives) {
      switch (passive.type) {
        case CountryPassiveType.INCREASE_INCOMING:
          totals.balance = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: totals.balance,
            valueIncrementType: passive.valueType,
          });
          break;

        case CountryPassiveType.INCREASE_OIL:
          totals.oil = CountryHelper.applyIncrementPassive({
            percentage: passive.value,
            value: totals.oil,
            valueIncrementType: passive.valueType,
          });
          break;
      }
    }

    const incoming: Incoming = {
      balance: totals.balance,
      oil: totals.oil,
    };

    return {
      incoming,
      provincesIncoming,
    };
  }

  static applyIncrementPassive(data: ApplyIncrementPassiveParam): number {
    if (data.valueIncrementType === CountryPassiveValueType.STATIC) {
      return data.value + data.percentage;
    }

    return MathHelper.getPercetageValue(data.value, data.percentage, true);
  }
}

type GetProvinceIncomingParam = {
  mapRef?: string;
  levels: ProvinceLevels;
  oilProduction: number;
  passives?: ProvincePassive[];
};

type GetIncomingParam = {
  provinces: Province[];
  passives: CountryPassive[];
  focus: Focus;
  personality: Personality;
};

type ApplyIncrementPassiveParam = {
  value: number;
  percentage: number;
  valueIncrementType: CountryPassiveValueType;
};
