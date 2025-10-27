import { getConnection } from 'typeorm';
import { Player } from './player.entity';

export function playerRepository() {
  return getConnection().getRepository(Player);
}
