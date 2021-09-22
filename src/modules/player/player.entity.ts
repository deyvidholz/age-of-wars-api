import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../country/country.entity';
import { Game } from '../game/game.entity';
import { encryptPassword } from './player.helper';

@Entity({ name: 'players' })
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  nickname: string;

  @Column({ select: false, length: 255 })
  password: string;

  @Column({ nullable: true })
  currentGameId: string;

  @Column({ default: false })
  alreadyPlayed: boolean;

  @Column({ default: 0 })
  exp: number;

  @Column({ default: 0 })
  level: number;

  @OneToMany(() => Game, (game) => game.owner)
  games: Game[];

  @OneToMany(() => Country, (country) => country.owner)
  countries: Country[];

  @BeforeInsert()
  private beforeInsert() {
    this.password = encryptPassword(this.password);
  }
}
