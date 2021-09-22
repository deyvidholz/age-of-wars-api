import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../country/country.entity';
import { Player } from '../player/player.entity';
import { War } from '../war/war.entity';
import { GameOptions, GameStage } from './game.typing';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.games, { eager: true })
  owner: Player;

  @Column({ default: GameStage.CLOSED })
  stage: GameStage;

  @Column({ default: 1 })
  stageCount: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  password?: string;

  @ManyToMany(() => Player, { eager: true })
  @JoinTable()
  players: Player[];

  @OneToMany(() => Country, (country) => country.game, {
    eager: true,
    cascade: true,
  })
  countries: any[];

  @ManyToMany(() => War, { eager: true })
  @JoinTable()
  wars: War[];

  @Column({ type: 'json', default: '{}' })
  options: GameOptions;

  isOpen(): boolean {
    return (
      this.stage === GameStage.IN_LOBBY || this.stage === GameStage.RUNNING
    );
  }

  hasEverybodyPlayed(): boolean {
    return (
      this.players.filter((player) => player.alreadyPlayed).length ===
      this.players.length
    );
  }

  setNextTurn(force: boolean = false) {
    if (this.hasEverybodyPlayed() || force) {
      this._setNextTurn();
    }
  }

  private _setNextTurn() {
    this.owner.alreadyPlayed = false;
    this.players = this.players.map((player) => {
      player.alreadyPlayed = false;
      return player;
    });

    this.stage === GameStage.RUNNING;
    this.stageCount++;

    // TODO country actions
  }
}
