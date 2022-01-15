import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Frequency } from './frequency.enum';

@Entity('subscriber')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subscriberName: string;

  @Column()
  subscriptionTime: string;

  @Column()
  subscriberCountry: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Frequency })
  frequency: Frequency;
}
