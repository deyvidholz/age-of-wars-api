import { getConnection } from 'typeorm';
import { Game } from './game.entity';

export function gameRepository() {
  return getConnection().getRepository(Game);
}
