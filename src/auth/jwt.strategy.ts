import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import fromAuthHeaderAsBearerToken = ExtractJwt.fromAuthHeaderAsBearerToken;
import { JwtPayload } from './interfaces/jwt.payload';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate({ username }: JwtPayload) {
    const user = await this.userRepository.findOne({ username });

    if (!username) throw new UnauthorizedException();

    return user;
  }
}
