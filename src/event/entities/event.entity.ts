import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid') eventId: string;
  @Column({ type: 'varchar', nullable: false }) title: string;
  @Column({ type: 'integer', nullable: false }) capacity: number;
  @Column({ type: 'boolean', nullable: false }) is_private: boolean;
  @Column({ type: 'varchar', nullable: true }) password?: string;
  @Column({ type: 'timestamp', nullable: false }) start_date: Date;
  @Column({ type: 'timestamp', nullable: false }) end_date: Date;
}
