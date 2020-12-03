import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserArgs } from './dto/register-user.args';
import { hash } from 'bcryptjs';
import { BadRequestException, Logger } from '@nestjs/common';
import { USER } from '../config/context.constant';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(USER.REPOSITORY);

  async register({ email, password }: RegisterUserArgs) {
    const hashedPassword = await hash(password, 12);
    const user = new User(email, hashedPassword);
    try {
      const newUser = await this.save(user);
      this.logger.debug(`Successful registration`);
      return newUser;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
