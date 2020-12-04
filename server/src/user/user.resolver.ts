import { Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';

import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards/graphql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { description: 'Find all database users' })
  @UseGuards(GraphqlAuthGuard)
  users() {
    return this.userService.findAll();
  }
}
