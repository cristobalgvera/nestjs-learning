import { ArgsType, Field, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { MinLength } from 'class-validator';

@ArgsType()
export class LoginUserArgs extends PickType(User, ['email'], ArgsType) {
  @Field()
  @MinLength(6)
  readonly password: string;
}
