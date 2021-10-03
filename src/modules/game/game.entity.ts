import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActionService } from '../action/action.service';
import { Country } from '../country/country.entity';
import { Player } from '../player/player.entity';
import { War } from '../war/war.entity';
import { Coalition, GameOptions, GameStage } from './game.typing';

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
  countries: Country[];

  @OneToMany(() => War, (war) => war.game, { eager: true })
  wars: War[];

  @Column({
    type: 'json',
    default: '[]',
  })
  coalitions: Coalition[];

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

  setNextTurn(force: boolean = false): boolean {
    if (this.hasEverybodyPlayed() || force) {
      this._setNextTurn();
      return true;
    }

    return false;
  }

  private async _setNextTurn() {
    this.owner.alreadyPlayed = false;

    this.players = this.players.map((player) => {
      player.alreadyPlayed = false;
      return player;
    });

    this.countries = this.countries.map((country) => {
      country.messages = [];
      return country;
    });

    this.stage = GameStage.RUNNING;
    this.stageCount++;

    await ActionService.runActions({
      game: this,
    });

    console.log('');
    console.log('');
    console.log('');
    console.log('gwars', this.wars);
  }
}
