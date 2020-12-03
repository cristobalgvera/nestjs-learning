import { ArgsType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ArgsType()
export class FindUserArgs extends PickType(User, ['email'], ArgsType) {}
