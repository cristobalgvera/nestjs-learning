import { ArgsType, PickType } from '@nestjs/graphql';
import { Product } from '../entities';

@ArgsType()
export class GetProductArgs extends PickType(Product, ['id'], ArgsType) {}
