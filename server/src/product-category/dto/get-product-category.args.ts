import { ArgsType, PickType } from '@nestjs/graphql';
import { ProductCategory } from '../entities';

@ArgsType()
export class GetProductCategoryArgs extends PickType(
  ProductCategory,
  ['id'],
  ArgsType,
) {}
