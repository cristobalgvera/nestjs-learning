import { RegisterUserArgs } from './register-user.args';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(RegisterUserArgs) {
  @Field(() => Int)
  id: number;
}
