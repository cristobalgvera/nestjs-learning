import { ArgsType, PickType } from '@nestjs/graphql';
import { User } from '../entities';

@ArgsType()
export class FindUserArgs extends PickType(User, ['email'], ArgsType) {}
