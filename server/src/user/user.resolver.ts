import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards';
import { CurrentUser } from './decorators';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { description: 'Find all database users' })
  @UseGuards(GraphqlAuthGuard)
  users() {
    return this.userService.findAll();
  }

  @Query(() => String)
  @UseGuards(GraphqlAuthGuard)
  hi(@CurrentUser() { email }: User) {
    return `Hi ${email}`;
  }
}
