import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ password, username }: AuthCredentialsDto) {
    const user = new User(username, password);
    try {
      return await user.save();
    } catch ({ code }) {
      if (code === '23505')
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }
}
