import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryPassive } from '../../data/templates/country-passives.template';
import { economicFocus, Focus } from '../../data/templates/focuses.template';
import {
  neutralPersonality,
  Personality,
} from '../../data/templates/personalities.template';
import { GeneralHelper } from '../../helpers/general.helper';
import { MathHelper } from '../../helpers/math.helper';
import { Action } from '../action/action.typing';
import { Game } from '../game/game.entity';
import { Player } from '../player/player.entity';
import { Demand } from '../war/war.typing';
import { CountryHelper } from './country.helper';
import {
  Aggressiveness,
  Army,
  CountryInfo,
  CountrySimplified,
  Decision,
  Economy,
  EstimatedArmy,
  Incoming,
  Message,
  MilitaryPower,
  Opinion,
  Opinions,
  Production,
  Province,
  ProvinceIncoming,
  Resource,
  SetOpinionOfActionParam,
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
  improvingRelationsOf: CountrySimplified[];

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
    default: '[]',
  })
  decisions?: Decision[];

  @Column({
    type: 'json',
    default: '{}',
  })
  militaryPower?: MilitaryPower;

  @Column({
    type: 'json',
    default: '{}',
  })
  incoming?: Incoming;

  @Column({ default: 0 })
  totalProvinces?: number;

  @ManyToOne(() => Player, (player) => player.countries, { eager: true })
  owner?: Player;

  @ManyToOne(() => Game, (game) => game.countries)
  game?: Game;

  doNotcallChangeFunctionOnSave?: boolean;

  getNameAsConstant?(): string {
    return GeneralHelper.getStringAsScreamingSnakeCase(this.name);
  }

  updateEstimatedArmy() {
    let minPercentage = 7;
    let maxPercentage = 7;

    this.estimatedArmy = {
      aircrafts: 0,
      divisions: 0,
      tanks: 0,
      warships: 0,
    };

    const keys = Object.keys(this.estimatedArmy);

    for (const key of keys) {
      this.estimatedArmy[key] = MathHelper.getEstimated(
        minPercentage,
        maxPercentage,
        this.army[key],
        true
      );
    }
  }

  isAlliedWith(countryId: string): boolean {
    return this.allies.some((ally) => ally.id === countryId);
  }

  isEnemyOf(countryId: string): boolean {
    return this.enemies.some((enemy) => enemy.id === countryId);
  }

  isAtWarWith(countryId: string): boolean {
    return this.inWarWith.some((country) => country.id === countryId);
  }

  isIndependenceGuaranteedBy(countryId: string): boolean {
    return this.independenceGuaranteedBy.some(
      (target) => target.id === countryId
    );
  }

  isImprovingRelationsOf(countryId: string): boolean {
    return this.improvingRelationsOf.some((target) => target.id === countryId);
  }

  isGuaranteeingIndependenceOf(countryId: string): boolean {
    return this.guaranteeingIndependence.some(
      (target) => target.id === countryId
    );
  }

  hasIndependenceGuaranteeRelations(countryId: string): boolean {
    return (
      this.isIndependenceGuaranteedBy(countryId) ||
      this.isGuaranteeingIndependenceOf(countryId)
    );
  }

  hasFriendlyRelations(
    countryId: string,
    includeImprovingRelations: boolean = true
  ): boolean {
    if (includeImprovingRelations) {
      return (
        this.hasIndependenceGuaranteeRelations(countryId) ||
        this.isAlliedWith(countryId) ||
        this.isImprovingRelationsOf(countryId)
      );
    }

    return (
      this.hasIndependenceGuaranteeRelations(countryId) ||
      this.isAlliedWith(countryId)
    );
  }

  hasBadRelations(countryId: string): boolean {
    return this.isEnemyOf(countryId) || this.isAtWarWith(countryId);
  }

  getOpinionOf(countryName: string): Opinion | undefined {
    return this.opinions[countryName];
  }

  setOpinionOf(
    countryName: string,
    value: number,
    action: SetOpinionOfActionParam
  ) {
    const country = this.opinions[countryName];

    if (!country) {
      return;
    }

    value = Math.abs(value);

    switch (action) {
      case SetOpinionOfActionParam.SET:
        country.value = value;
        break;

      case SetOpinionOfActionParam.SUM:
        country.value += value;
        break;

      case SetOpinionOfActionParam.SUBTRACT:
        country.value -= value;
        break;
    }

    CountryHelper.fixOpinion(country);
  }

  addAlly(country: CountrySimplified) {
    if (this.isAlliedWith(country.id)) {
      return;
    }

    if (country.id === this.id) {
      return;
    }

    this.allies.push(country);
  }

  addEnemy(country: CountrySimplified) {
    if (this.isEnemyOf(country.id)) {
      return;
    }

    if (country.id === this.id) {
      return;
    }

    this.enemies.push(country);
  }

  addInWarWith(country: CountrySimplified) {
    if (this.isAtWarWith(country.id)) {
      return;
    }

    if (country.id === this.id) {
      return;
    }

    this.inWarWith.push(country);
  }

  addImproveRelations(country: CountrySimplified) {
    if (this.isImprovingRelationsOf(country.id)) {
      return;
    }

    if (country.id === this.id) {
      return;
    }

    this.improvingRelationsOf.push(country);
  }

  removeAlly(countryId: string) {
    this.allies = this.allies.filter((ally) => ally.id !== countryId);
  }

  removeEnemy(countryId: string) {
    this.enemies = this.enemies.filter((enemy) => enemy.id !== countryId);
  }

  removeInWarWith(countryId: string) {
    this.inWarWith = this.inWarWith.filter((target) => target.id !== countryId);
  }

  removeImproveRelations(country: CountrySimplified) {
    this.improvingRelationsOf = this.improvingRelationsOf.filter(
      (target) => target.id !== country.id
    );
  }

  removeIndependenceGuaranteeingRelations(countryId: string) {
    this.independenceGuaranteedBy = this.independenceGuaranteedBy.filter(
      (target) => target.id !== countryId
    );
    this.guaranteeingIndependence = this.guaranteeingIndependence.filter(
      (target) => target.id !== countryId
    );
  }

  guaranteeIndependenceOf(country: CountrySimplified) {
    if (this.hasFriendlyRelations(country.id, false)) {
      return;
    }

    if (country.id === this.id) {
      return;
    }

    this.guaranteeingIndependence.push(country);
  }

  addIndependenceGuaranteedBy(country: CountrySimplified) {
    if (this.hasFriendlyRelations(country.id, false)) {
      return;
    }

    if (country.id === this.id) {
      return;
    }

    this.independenceGuaranteedBy.push(country);
  }

  removeGuaranteeIndependenceOf(countryId: string) {
    this.guaranteeingIndependence = this.guaranteeingIndependence.filter(
      (c) => c.id !== countryId
    );
  }

  removeIndependenceGuaranteedBy(countryId: string) {
    this.independenceGuaranteedBy = this.independenceGuaranteedBy.filter(
      (c) => c.id !== countryId
    );
  }

  getCountrySimplifiedData(): CountrySimplified {
    return {
      flag: this.flag,
      name: this.name,
      id: this.id,
    };
  }

  isControlledByPlayer(playerId?: string): boolean {
    if (this.isAi) {
      return false;
    }

    if (playerId) {
      return this.owner.id === playerId;
    }

    return true;
  }

  getMilitaryPower(): MilitaryPower {
    return CountryHelper.getMilitaryPower(this.army);
  }

  getIncoming(): { incoming: Incoming; provincesIncoming: ProvinceIncoming[] } {
    return CountryHelper.getIncoming({
      passives: this.passives,
      provinces: this.provinces,
      focus: this.focus,
      personality: this.personality,
      army: this.army,
    });
  }

  getPassives(): CountryPassive[] {
    return [
      ...this.passives,
      ...this.personality.passives,
      ...this.focus.passives,
    ];
  }

  @BeforeInsert()
  private beforeInsert() {
    this.beforeChange();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.beforeChange();
  }

  private beforeChange() {
    if (this.doNotcallChangeFunctionOnSave) {
      return;
    }

    // TODO reduce loopings
    for (const province of this.provinces) {
      if (!province.passives) {
        province.passives = [];
      }

      for (const passive of province.passives) {
        if (typeof passive.duration !== 'number') {
          continue;
        }

        passive.duration--;
      }

      province.passives = province.passives.filter(
        (passive) =>
          typeof passive.duration !== 'number' || passive.duration > -1
      );
    }

    const incomings = this.getIncoming();

    for (const province of this.provinces) {
      const incoming = incomings.provincesIncoming.find(
        (i) => i.mapRef === province.mapRef
      );

      // Removing unnecessary properties
      delete incoming.mapRef;
      delete incoming.name;

      province.incoming = incoming;

      if (!incoming) {
        province.incoming = CountryHelper.getProvinceIncoming({
          levels: province.levels,
          oilProduction: province.oilProduction,
          passives: province.passives,
        });
      }
    }

    this.incoming = incomings.incoming;

    if (isNaN(this.incoming.balance)) {
      this.incoming.balance = 0;
    }

    if (isNaN(this.incoming.oil)) {
      this.incoming.oil = 0;
    }

    this.militaryPower = this.getMilitaryPower();
    this.totalProvinces = this.provinces.length;

    this.updateEstimatedArmy();
  }

  addAggressiveness(value: number) {
    if (value < 0) {
      value = Math.abs(value);
    }

    this.aggressiveness.current += value;
    this.aggressiveness.total += value;
  }

  reduceAggressiveness(value: number) {
    if (value > 0) {
      value = -Math.abs(value);
    }

    this.aggressiveness.current += value;

    if (this.aggressiveness.current < 0) {
      this.aggressiveness.current = 0;
    }
  }

  setNewCapital(mapRef?: string) {
    if (!this.provinces.length) {
      return;
    }

    if (mapRef) {
      const province = this.provinces.find(
        (province) => province.mapRef === mapRef
      );

      if (province) {
        province.isCapital = true;
      }
    }

    this.provinces.sort((a, b) => {
      let totalLevel = {
        a: a.levels.production + a.levels.taxation,
        b: b.levels.production + b.levels.taxation,
      };

      return totalLevel.b - totalLevel.a;
    });

    this.provinces[0].isCapital = true;
  }
}
