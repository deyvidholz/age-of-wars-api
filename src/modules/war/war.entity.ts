import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
