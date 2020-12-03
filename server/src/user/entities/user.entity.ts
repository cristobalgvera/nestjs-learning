import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'Common application user' })
@Entity()
export class User extends BaseEntity {
  constructor(email?: string, password?: string) {
    super();
    this.email = email;
    this.password = password;
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ name: 'email', description: 'User email' })
  @Column()
  email: string;

  @Column()
  password: string;
}
