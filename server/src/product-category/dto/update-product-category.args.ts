import { Field, PartialType, ArgsType, ID } from '@nestjs/graphql';
import { CreateProductCategoryArgs } from './create-product-category.args';

@ArgsType()
export class UpdateProductCategoryArgs extends PartialType(
  CreateProductCategoryArgs,
  ArgsType,
) {
  @Field(() => ID)
  id: number;
}
