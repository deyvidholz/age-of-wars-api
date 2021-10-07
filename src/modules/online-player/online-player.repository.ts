import { getConnection } from 'typeorm';
import { OnlinePlayer } from './online-player.entity';

export function onlinePlayerRepository() {
  return getConnection().getRepository(OnlinePlayer);
}
