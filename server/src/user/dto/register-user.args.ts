import { Field, ArgsType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@ArgsType()
export class RegisterUserArgs {
  @Field({ description: 'User email' })
  @IsEmail()
  email: string;

  @Field({ description: 'User password' })
  @MinLength(6)
  password: string;
}
