import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AUTH } from '../config/context.constant';
import { LoginUserArgs, RegisterUserArgs } from '../user/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { compare, hash } from 'bcryptjs';
import { HttpContext, JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseType } from './dto';
import { User } from '../user/entities';
import * as config from 'config';

const { refreshExpiresIn, refreshSecret } = config.get('jwt');
const {
  cookie: { name },
} = config.get('storage');

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AUTH.SERVICE);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, email }: RegisterUserArgs) {
    this.logger.debug(`Registering user email: ${email}`);
    this.logger.debug(`Encrypting password`);
    const hashedPassword = await hash(password, 12);
    return this.userRepository.register({
      email,
      password: hashedPassword,
    });
  }

  async login(
    { password, email }: LoginUserArgs,
    httpContext: HttpContext,
  ): Promise<LoginResponseType> {
    this.logger.debug(`Trying to log with user email: ${email} from database`);
    const user = await this.userRepository.findUser({ email });

    this.logger.debug(`Checking password`);
    const isValid = await compare(password, user.password);

    delete user.password;

    if (!isValid) {
      this.logger.warn('Bad credentials');
      throw new BadRequestException('Invalid credentials');
    }

    const payload: JwtPayload = {
      tokenVersion: user.tokenVersion + 1,
      email: user.email,
    };
    const accessToken = this.createAccessToken(payload);

    await this.appendToContext(user, { res: httpContext.res });

    this.logger.debug(
      `JWT tokens generated with payload: ${JSON.stringify(payload)}`,
    );
    return { accessToken };
  }

  async validateJwtRefreshToken(accessToken: string, httpContext: HttpContext) {
    this.logger.debug(`Validating JWT refresh token`);
    return this.validateJwtToken(accessToken, httpContext, true);
  }

  async validateJwtAccessToken(accessToken: string, httpContext?: HttpContext) {
    this.logger.debug(`Validating JWT access token`);
    return this.validateJwtToken(accessToken, httpContext);
  }

  private async validateJwtToken(
    accessToken: string,
    httpContext?: HttpContext,
    refresh?: boolean,
  ) {
    try {
      let jwtPayload: JwtPayload;
      if (refresh)
        jwtPayload = this.jwtService.verify(accessToken, {
          secret: refreshSecret,
        });
      else jwtPayload = this.jwtService.verify(accessToken);
      const { tokenVersion, email } = jwtPayload;

      this.logger.debug(`Getting user email: ${email} from database`);
      const user = await this.userRepository.findOneOrFail({ email });
      delete user.password;

      this.logger.debug(`Validating token version`);
      if (tokenVersion !== user.tokenVersion)
        throw new BadRequestException('Invalid credentials');

      if (httpContext) await this.appendToContext(user, httpContext);
      delete user.tokenVersion;

      return { user };
    } catch (error) {
      let err: string;
      if (error.name === 'Error') err = error.message;
      else err = error.name;
      this.logger.warn(`Error while validating: ${error.name}`);
      return { error: err };
    }
  }

  private async appendToContext(user: User, { req, res }: HttpContext) {
    if (req) {
      this.logger.debug('Appending user to context');
      req.user = user;
    }
    if (res) {
      const payload: JwtPayload = {
        email: user.email,
        tokenVersion: user.tokenVersion,
      };
      const cookie = this.createRefreshToken({
        ...payload,
        tokenVersion: payload.tokenVersion + 1,
      });
      this.logger.debug('Creating cookie with JWT refresh token');
      res.cookie(name, cookie, {
        httpOnly: true,
      });
      this.logger.debug(`Updating tokenVersion in database`);
      await this.userRepository.increment(
        { email: payload.email },
        'tokenVersion',
        1,
      );
    }
  }

  private createAccessToken(payload: JwtPayload) {
    this.logger.debug('Creating JWT access token');
    return this.jwtService.sign(payload);
  }

  private createRefreshToken(payload: JwtPayload) {
    this.logger.debug('Creating JWT refresh token');
    return this.jwtService.sign(payload, {
      expiresIn: refreshExpiresIn,
      secret: refreshSecret,
    });
  }
}
