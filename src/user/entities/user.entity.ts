import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Event } from 'src/event/entities/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column({ name: 'username', type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar', nullable: false })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string;

  @OneToMany(() => Event, (event) => event.organizer)
  organizerOf: Event[];

  @ManyToOne(() => Event, (event) => event.members)
  memberOf: Event;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
