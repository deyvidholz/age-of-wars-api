import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { WarDetails, WarMessage, WarParticipant } from './war.typing';

@Entity({ name: 'wars' })
export class War {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  isOver: boolean;

  @Column()
  gameId: string;

  @Column()
  startedAtStage: number;

  @Column({ nullable: true })
  endAtStage: number;

  @Column({ type: 'json' })
  details: WarDetails;

  @Column({ type: 'json', default: '[]' })
  globalMessages?: WarMessage[];

  @Column({ type: 'json', default: '[]' })
  messagesToAttackers?: WarMessage[];

  @Column({ type: 'json', default: '[]' })
  messagesToVictims?: WarMessage[];

  @Column({ type: 'json', default: '[]' })
  participants?: WarParticipant[];
}
