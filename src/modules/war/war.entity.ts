import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../country/country.entity';
import { WarDetails, WarMessage, WarParticipant, WarStage } from './war.typing';

@Entity({ name: 'wars' })
export class War {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  gameId: string;

  @Column({ default: WarStage.PREPARING })
  stage: WarStage;

  @Column()
  startAtStage: number;

  @Column({ nullable: true })
  endAtStage: number;

  @Column({ type: 'json' })
  details: WarDetails;

  isParticipating(countryId: string): boolean {
    return (
      this.details.attacker.id === countryId ||
      this.details.victim.id === countryId ||
      this.details.attacker.allies.some((a) => a.id === countryId) ||
      this.details.victim.allies.some((a) => a.id === countryId)
    );
  }

  isWarOwner(countryId: string): boolean {
    return (
      this.details.attacker.id === countryId ||
      this.details.victim.id === countryId
    );
  }

  removeParticipant(countryId: string) {
    this.details.attacker.allies ===
      this.details.attacker.allies.filter((ally) => ally.id !== countryId);

    this.details.victim.allies ===
      this.details.victim.allies.filter((ally) => ally.id !== countryId);
  }
}
