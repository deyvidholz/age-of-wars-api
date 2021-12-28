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
import { Province, TradingProvince } from '../country/country.typing';
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
  log?: string[];

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

  @Column({
    type: 'json',
    default: '[]',
  })
  tradingProvinces?: TradingProvince[];

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

    await ActionService.runWars({
      game: this,
    });

    await ActionService.runCoalitions({
      game: this,
    });

    this.handler();
  }

  getAllProvinces(): Province[] {
    const provinces: Province[] = [];

    for (const country of this.countries) {
      provinces.push(...country.provinces);
    }

    return provinces;
  }

  /**
   * Will be executed every stage change, after all actions
   */
  private handler() {
    for (const index in this.tradingProvinces) {
      const tradingProvince = this.tradingProvinces[index];

      tradingProvince.duration--;

      if (tradingProvince.duration < 1) {
        this.tradingProvinces.splice(+index, 1);
      }
    }
  }
}
