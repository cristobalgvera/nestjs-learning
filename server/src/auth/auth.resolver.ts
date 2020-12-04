import { Args, Mutation, PartialType, Query, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { RegisterUserArgs } from '../user/dto/register-user.args';
import { LoginResponseType } from './dto/login-response.type';
import { LoginUserArgs } from '../user/dto/login-user.args';
import { AuthService } from './auth.service';
import { GraphqlAuthGuard } from './guards/graphql-auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';

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

  @Query(() => User)
  @UseGuards(GraphqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
