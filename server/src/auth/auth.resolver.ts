import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { ValidationPipe } from '@nestjs/common';
import { RegisterUserArgs } from '../user/dto/register-user.args';
import { LoginResponseType } from './dto/login-response.type';
import { LoginUserArgs } from '../user/dto/login-user.args';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { description: 'Register a new user in database' })
  register(@Args(ValidationPipe) registerUserArgs: RegisterUserArgs) {
    return this.authService.register(registerUserArgs);
  }

  @Mutation(() => LoginResponseType, {
    description: 'Login with username and password',
  })
  login(@Args(ValidationPipe) loginUserArgs: LoginUserArgs) {
    return this.authService.login(loginUserArgs);
  }
}
