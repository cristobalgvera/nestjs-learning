import { ArgsType, PickType } from '@nestjs/graphql';
import { ProductCategory } from '../entities';

@ArgsType()
export class DeleteProductCategoryArgs extends PickType(
  ProductCategory,
  ['id'],
  ArgsType,
) {}
