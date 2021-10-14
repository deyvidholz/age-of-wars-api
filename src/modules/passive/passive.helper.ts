import {
  CountryPassive,
  CountryPassiveType,
  CountryPassiveValueType,
} from '../../data/templates/country-passives.template';
import { MathHelper } from '../../helpers/math.helper';
import { Operation } from '../../typing/general.typing';

export class PassiveHelper {
  static setPassives(data: SetPassivesParam): number {
    const { passives, applyOnly } = data;
    let { value } = data;

    const passivesFiltered = passives.filter((p) => applyOnly.includes(p.type));

    for (const passive of passivesFiltered) {
      let operation: Operation = Operation.SUM;

      if (
        (passive.operation && passive.operation === Operation.SUM) ||
        (!passive.operation && passive.type.match(/DECREASE|REDUCE|SUBTRACT/))
      ) {
        operation = Operation.SUBTRACT;
      }

      value = PassiveHelper.applyPassive({
        operation,
        passive,
        value,
      });
    }

    return value;
  }

  static applyPassive(data: ApplyPassiveParam): number {
    const { operation, passive } = data;
    let { value } = data;

    if (passive.valueType === CountryPassiveValueType.STATIC) {
      switch (operation) {
        case Operation.SUBTRACT:
          value -= Math.abs(passive.value);
          break;
        case Operation.SUM:
          value += Math.abs(passive.value);
          break;
      }

      return value;
    }

    switch (operation) {
      case Operation.SUBTRACT:
        return MathHelper.subtractByPercentage(value, passive.value);
      case Operation.SUM:
        return MathHelper.getPercetageValue(value, passive.value, true);
    }
  }
}

type SetPassivesParam = {
  value: number;
  passives: CountryPassive[];
  applyOnly: CountryPassiveType[];
};

type ApplyPassiveParam = {
  value: number;
  passive: CountryPassive;
  operation: Operation;
};
