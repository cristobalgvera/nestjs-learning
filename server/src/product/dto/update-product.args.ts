import { CreateProductArgs } from './create-product.args';
import { Field, Int, PartialType, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UpdateProductArgs extends PartialType(
  CreateProductArgs,
  ArgsType,
) {
  @Field(() => Int)
  id: number;
}
