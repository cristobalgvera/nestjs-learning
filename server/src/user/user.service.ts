import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { USER } from '../config/context.constant';

@Injectable()
export class UserService {
  private readonly logger = new Logger(USER.SERVICE);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll() {
    this.logger.debug('Getting all users from database');
    return this.userRepository.find();
  }

  async incrementTokenVersion(id: number) {
    return this.userRepository.increment({ id }, 'tokenVersion', 1);
  }
}
