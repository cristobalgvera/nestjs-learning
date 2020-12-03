import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { genSalt, hash } from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp({ password, username }: AuthCredentialsDto) {
    const salt = await genSalt();
    const encryptedPassword = await hash(password, salt);
    const user = new User(username, encryptedPassword, salt);

    try {
      return await user.save();
    } catch ({ code }) {
      if (code === '23505')
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  async validateUserPassword({ username, password }: AuthCredentialsDto) {
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) return username;
    else return null;
  }
}
