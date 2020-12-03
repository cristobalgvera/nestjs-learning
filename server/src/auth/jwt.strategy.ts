import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
import * as config from 'config';
import { FindUserArgs } from '../user/dto/find-user.args';
import { JWT } from '../config/context.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';

const { secret } = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JWT.STRATEGY);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate({ email }: FindUserArgs) {
    this.logger.debug(`Validating user email: ${email}`);
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
