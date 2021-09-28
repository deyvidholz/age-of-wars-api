import Probability from 'probability-node';

export class MathHelper {
  static percentDiff(number1: number, number2: number): number {
    if (number1 >= number2) {
      return ((number1 - number2) / number1) * 100.0;
    }

    return -Math.abs(((number2 - number1) / number2) * 100.0);
  }

  static getRandomNumber(min: number, max: number) {
    const num = Math.random() * (max - min) + min;
    return Math.trunc(num);
  }

  static chanceOf(chance: number) {
    if (chance >= 100) return true;
    if (chance <= 0) return false;

    let probabilityObject = {
      p: `${chance}%`,
      f: () => true,
    };

    const probabilitilized = new Probability(probabilityObject);
    return probabilitilized();
  }

  static getPercetageValue(
    value: number,
    percentage: number,
    sum: boolean = false
  ) {
    const percentageValue = (value * percentage) / 100;

    if (sum) {
      return value + percentageValue;
    }

    return percentageValue;
  }

  static subtractByPercentage(
    currentPrice: number,
    percentage: number
  ): number {
    let subtractValue = MathHelper.getPercetageValue(currentPrice, percentage);
    return currentPrice - subtractValue;
  }

  static getRandomIndex(data: any[]): any {
    return Math.floor(Math.random() * data.length);
  }

  static getRandomItem(data: any[]): any {
    return data[Math.floor(Math.random() * data.length)];
  }

  static getDiffPercentage(n1: number, n2: number) {
    if (n1 >= n2) {
      return ((n1 - n2) / n2) * 100;
    } else {
      return -Math.abs(((n2 - n1) / n1) * 100);
    }
  }

  static getEstimated(
    minPercentage: number,
    maxPercentage: number,
    value: number,
    convertToInt: boolean = true
  ) {
    const randomPercentage = MathHelper.getRandomNumber(
      minPercentage,
      maxPercentage
    );

    const finalValue = MathHelper.getPercetageValue(
      value,
      randomPercentage,
      true
    );

    if (convertToInt) {
      return Number(finalValue.toFixed(0));
    }

    return finalValue;
  }

  static fixDecimals(num: number, decimals: number = 2): number {
    if (isNaN(num)) {
      return 0;
    }

    return Number(num.toFixed(decimals));
  }

  static sumNumbers(...numbers: number[]) {
    return numbers.reduce((prev, next) => prev + next, 0);
  }
}
