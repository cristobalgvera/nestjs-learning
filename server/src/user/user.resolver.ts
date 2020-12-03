import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { Logger } from '@nestjs/common';
import { USER } from '../config/context.constant';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(USER.RESOLVER);

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }

  @Mutation(() => Boolean, { description: 'Register a new user in database' })
  async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    this.logger.debug(
      `Registering user email: ${email} and password: ${password}`,
    );
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
      this.logger.debug(`Registration success`);
      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}
