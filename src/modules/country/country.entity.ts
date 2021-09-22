import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CountryPassive } from '../../data/templates/country-passives.template';
import { economicFocus, Focus } from '../../data/templates/focuses.template';
import {
  neutralPersonality,
  Personality,
} from '../../data/templates/personalities.template';
import { GeneralHelper } from '../../helpers/general.helper';
import { Action } from '../action/action.typing';
import { Game } from '../game/game.entity';
import { Player } from '../player/player.entity';
import { Demand } from '../war/war.typing';
import {
  Aggressiveness,
  Army,
  CountryInfo,
  CountrySimplified,
  Economy,
  EstimatedArmy,
  Incoming,
  Message,
  MilitaryPower,
  Opinions,
  Province,
  Resource,
} from './country.typing';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  tag: string;

  @Column()
  flag: string;

  @Column()
  name: string;

  @Column()
  denonym: string;

  @Column({ default: '#FFFFFF' })
  color?: string;

  @Column({ default: true })
  isAi: boolean;

  @Column({ type: 'json', default: '{}' })
  army: Army;

  @Column({ type: 'json', default: '{}' })
  estimatedArmy?: EstimatedArmy;

  @Column({
    type: 'json',
    default: JSON.stringify({ ...neutralPersonality }),
  })
  personality: Personality;

  @Column({
    type: 'json',
    default: JSON.stringify({ ...economicFocus }),
  })
  focus: Focus;

  @Column({
    type: 'json',
    default: JSON.stringify({ current: 0, total: 0 } as Aggressiveness),
  })
  aggressiveness: Aggressiveness;

  @Column({
    type: 'json',
    default: JSON.stringify({ balance: 0 } as Economy),
  })
  economy: Economy;

  @Column({
    type: 'json',
    default: JSON.stringify({ oil: 0 } as Resource),
  })
  resources: Resource;

  @Column({
    type: 'json',
    default: '[]',
  })
  passives: CountryPassive[];

  @Column({
    type: 'json',
    default: '[]',
  })
  provinces: Province[];

  @Column({
    type: 'json',
    default: '[]',
  })
  actions: Action[];

  @Column({
    type: 'json',
    default: '{}',
  })
  info: CountryInfo;

  @Column({
    type: 'json',
    default: '[]',
  })
  allies: CountrySimplified[];

  @Column({
    type: 'json',
    default: '[]',
  })
  enemies: CountrySimplified[];

  @Column({
    type: 'json',
    default: '[]',
  })
  guaranteeingIndependence: CountrySimplified[];

  @Column({
    type: 'json',
    default: '[]',
  })
  independenceGuaranteedBy: CountrySimplified[];

  @Column({
    type: 'json',
    default: '[]',
  })
  inWarWith: CountrySimplified[];

  @Column({
    type: 'json',
    default: '[]',
  })
  demands: Demand[];

  @Column({
    type: 'json',
    default: '[]',
  })
  opinions: Opinions;

  @Column({
    type: 'json',
    default: '[]',
  })
  messages?: Message[];

  @Column({
    type: 'json',
    default: '{}',
  })
  militaryPower?: MilitaryPower[];

  @Column({
    type: 'json',
    default: '{}',
  })
  incoming?: Incoming[];

  @Column({ default: 0 })
  totalProvinces?: number;

  @ManyToOne(() => Player, (player) => player.countries, { eager: true })
  owner?: Player;

  @ManyToOne(() => Game, (game) => game.countries)
  game?: Game;

  getNameAsConstant?(): string {
    return GeneralHelper.getStringAsScreamingSnakeCase(this.name);
  }
}
