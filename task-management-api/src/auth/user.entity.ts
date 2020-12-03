import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { Task } from '../tasks/task.entity';

@Entity()
export class User extends BaseEntity {
  constructor(username?: string, password?: string, salt?: string) {
    super();
    this.username = username;
    this.password = password;
    this.salt = salt;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  async validatePassword(password: string) {
    const userHash = await hash(password, this.salt);
    return userHash === this.password;
  }
}
