import { ArgsType } from '@nestjs/graphql';
import { LoginUserArgs } from './login-user.args';

@ArgsType()
export class RegisterUserArgs extends LoginUserArgs {}
