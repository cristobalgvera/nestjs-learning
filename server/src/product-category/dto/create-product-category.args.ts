import { ArgsType, PickType } from '@nestjs/graphql';
import { ProductCategory } from '../entities';

@ArgsType()
export class CreateProductCategoryArgs extends PickType(
  ProductCategory,
  ['name'],
  ArgsType,
) {}
