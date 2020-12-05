import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities';
import { ValidationPipe } from '@nestjs/common';
import { RegisterUserArgs, LoginUserArgs } from '../user/dto';
import { LoginResponseType } from './dto';
import { AuthService } from './auth.service';
import { GraphQLHttpContext } from './decorators';
import { HttpContext } from './interfaces';

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
  login(
    @Args(ValidationPipe) loginUserArgs: LoginUserArgs,
    @GraphQLHttpContext() httpContext: HttpContext,
  ) {
    return this.authService.login(loginUserArgs, httpContext);
  }
}
