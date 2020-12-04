import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { RegisterUserArgs, LoginUserArgs } from '../user/dto';
import { LoginResponseType } from './dto';
import { AuthService } from './auth.service';
import { GraphqlAuthGuard } from './guards';
import { CurrentUser } from '../user/decorators';
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

  @Query(() => User)
  @UseGuards(GraphqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
