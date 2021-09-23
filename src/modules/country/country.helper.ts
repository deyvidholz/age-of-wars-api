import { Opinion } from './country.typing';

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
}
