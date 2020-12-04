import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserArgs } from './dto/register-user.args';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { USER } from '../config/context.constant';
import { FindUserArgs } from './dto/find-user.args';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(USER.REPOSITORY);

  async register({ email, password }: RegisterUserArgs) {
    const user = new User(email, password);
    try {
      const newUser = await this.save(user);
      this.logger.debug(`Successful registration`);
      return newUser;
    } catch (error) {
      this.logger.warn(error.message);
      if (error.code === '23505')
        throw new ConflictException('Username already exists');
      throw new InternalServerErrorException();
    }
  }

  async findUser({ email }: FindUserArgs) {
    this.logger.debug('Finding user from database');
    const user = await this.findOne({ email });
    if (!user) {
      this.logger.warn('User not found');
      throw new BadRequestException('Invalid credentials');
    }
    this.logger.debug('Successful transaction');
    return user;
  }
}
