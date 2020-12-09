import { ArgsType, Field, ID, PartialType, PickType } from '@nestjs/graphql';
import { Product } from '../entities';
import { IsNumber, IsUrl } from 'class-validator';
import { GetProductCategoryArgs } from '../../product-category/dto/get-product-category.args';

@ArgsType()
export class CreateProductArgs extends PickType(
  Product,
  ['name', 'price', 'measure'],
  ArgsType,
) {
  @Field(() => ID, { description: 'Product category ID' })
  readonly productCategoryId: GetProductCategoryArgs['id'];

  @Field({ description: 'Product image url', nullable: true, defaultValue: '' })
  readonly imageUrl?: string;
}
