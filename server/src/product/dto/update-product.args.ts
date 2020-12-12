import { CreateProductArgs } from './create-product.args';
import { Field, PartialType, ArgsType, ID } from '@nestjs/graphql';

@ArgsType()
export class UpdateProductArgs extends PartialType(
  CreateProductArgs,
  ArgsType,
) {
  @Field(() => ID)
  id: number;
}
