import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../product/entities';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsAlphanumeric } from 'class-validator';

@Entity()
@ObjectType()
export class ProductCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Category ID' })
  id: number;

  @Column()
  @IsAlphanumeric()
  @Field({ description: 'Category name' })
  name: string;

  @OneToMany(() => Product, (product) => product.category, {
    lazy: true,
    cascade: true,
  })
  @Field(() => [Product], { description: 'All product from specific category' })
  products: Product[];
}
