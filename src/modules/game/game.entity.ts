import {
  AfterLoad,
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
import { War } from '../war/war.typing';
import { Coalition, GameOptions, GameStage } from './game.typing';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Player, (player) => player.games, {
    eager: true,
    cascade: true,
  })
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

  @Column({
    type: 'json',
    default: '[]',
  })
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
    return ![...this.players, this.owner].some(
      (player) => !player.alreadyPlayed
    );
  }

  async setNextTurn(force: boolean = false): Promise<boolean> {
    if (this.hasEverybodyPlayed() || force) {
      await this._setNextTurn();
      return true;
    }

    return false;
  }

  private async _setNextTurn() {
    this.stage = GameStage.RUNNING;
    this.stageCount++;

    await ActionService.runActions({
      game: this,
    });
  }
}
