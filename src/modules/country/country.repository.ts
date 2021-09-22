import { getConnection } from 'typeorm';
import { Country } from './country.entity';

export function countryRepository() {
  return getConnection().getRepository(Country);
}
