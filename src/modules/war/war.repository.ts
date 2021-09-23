import { getConnection } from 'typeorm';
import { War } from './war.entity';

export function warRepository() {
  return getConnection().getRepository(War);
}
