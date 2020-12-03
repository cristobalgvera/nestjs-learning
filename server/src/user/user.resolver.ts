import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { hash } from 'bcryptjs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { USER } from '../config/context.constant';
import { RegisterUserArgs } from './dto/register-user.args';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(USER.RESOLVER);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  @Query(() => [User], { description: 'Find all database users' })
  async users() {
    this.logger.debug('Getting all users from database through repository');
    return await this.userRepository.find();
  }

  @Mutation(() => User, { description: 'Register a new user in database' })
  async register(@Args(ValidationPipe) registerUserArgs: RegisterUserArgs) {
    this.logger.debug(`Registering user email: ${registerUserArgs.email}`);
    return await this.userRepository.register(registerUserArgs);
  }
}
