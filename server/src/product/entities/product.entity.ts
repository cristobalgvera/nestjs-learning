import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from '../../product-category/entities';
import { IsNumber, IsString, IsUrl } from 'class-validator';

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'Product ID' })
  id: number;

  @Column()
  @IsString()
  @Field({ description: 'Product name' })
  name: string;

  @Column()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Field(() => Int, { description: 'Product price' })
  price: number;

  @Column({ default: '' })
  @IsString()
  @Field({ description: 'Product measurement', nullable: true })
  measure?: string;

  @Column({ default: '' })
  @IsUrl()
  @Field({ description: 'Product image url', nullable: true, defaultValue: '' })
  imageUrl?: string;

  @ManyToOne(() => ProductCategory, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  @Field(() => ProductCategory, { description: 'Product category' })
  category: ProductCategory;
}
