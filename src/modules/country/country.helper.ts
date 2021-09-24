import { Country } from './country.entity';
import { Message, Opinion } from './country.typing';

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
}
