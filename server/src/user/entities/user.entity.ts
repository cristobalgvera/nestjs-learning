import { ObjectType, Field, Int } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ name: 'email', description: 'User email' })
  @Column()
  email: string;

  @Field({ name: 'password', description: 'User password' })
  @Column()
  password: string;
}
