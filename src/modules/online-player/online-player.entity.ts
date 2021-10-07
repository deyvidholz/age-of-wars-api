import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('online_players')
export class OnlinePlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  playerId: string;

  @Column()
  gameId: string;

  @Column()
  socketId: string;

  @Column()
  playerNickname: string;
}
