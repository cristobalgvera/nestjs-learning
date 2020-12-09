import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards';
import { CurrentUser } from './decorators';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { description: 'Find all database users' })
  users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(GraphqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // Testing purpose
  @Mutation(() => Boolean, {
    description: 'Testing mutation to revoke refresh JWT',
  })
  async revokeRefreshTokensForUser(@Args('id') id: number) {
    const { affected } = await this.userService.incrementTokenVersion(id);
    return !!affected;
  }
}
