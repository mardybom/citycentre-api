import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid', { name: 'event_id' })
  eventId: string;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  title: string;

  @Column({ name: 'capacity', type: 'integer', nullable: false })
  capacity: number;

  @Column({ name: 'is_private', type: 'boolean', nullable: false })
  isPrivate: boolean;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password?: string;

  @Column({ name: 'start_date', type: 'timestamp', nullable: false })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: false })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.organizerOf)
  organizer: User;

  @OneToMany(() => User, (user) => user.memberOf)
  members: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
