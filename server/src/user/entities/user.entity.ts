import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';

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
  readonly id: number;

  @Field({ name: 'email', description: 'User email' })
  @Column({ unique: true })
  @IsEmail()
  readonly email: string;

  @Column()
  @MinLength(6)
  password: string;

  @Column({ default: 0 })
  tokenVersion: number;
}
