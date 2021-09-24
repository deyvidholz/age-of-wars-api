import { Country } from '../country/country.entity';
import { WarParticipant } from './war.typing';

export class WarHelper {
  static getWarParticipantMounted(country: Country): WarParticipant {
    return {
      id: country.id,
      flag: country.flag,
      name: country.name,
      losses: {
        aircrafts: 0,
        balance: 0,
        divisions: 0,
        tanks: 0,
        warships: 0,
      },
    };
  }
}
