import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { AUTH } from '../config/context.constant';
import { LoginUserArgs } from '../user/dto/login-user.args';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { RegisterUserArgs } from '../user/dto/register-user.args';
import { compare, hash } from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt.payload';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseType } from './dto/login-response.type';
import { JwtValidation } from './interfaces/jwt.validation';

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

  async login({ password, email }: LoginUserArgs): Promise<LoginResponseType> {
    this.logger.debug(`Trying to log with user email: ${email} from database`);
    const user = await this.userRepository.findUser({ email });

    this.logger.debug(`Checking password`);
    const isValid = await compare(password, user.password);

    if (!isValid) {
      this.logger.warn('Bad credentials');
      throw new BadRequestException('Invalid credentials');
    }

    this.logger.debug('Generating JWT token');
    const payload: JwtPayload = { id: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    this.logger.debug(
      `JWT token generated with payload: ${JSON.stringify(payload)}`,
    );
    return { accessToken };
  }

  async validateJwtToken(accessToken: string): Promise<JwtValidation> {
    this.logger.debug(
      `Validating JWT access token ${accessToken.slice(0, 20)}...`,
    );
    try {
      const { email }: JwtPayload = this.jwtService.verify(accessToken);
      const user = await this.userRepository.findOne({ email });
      if (user) delete user.password;
      return { user };
    } catch ({ name }) {
      this.logger.warn(`Error while validating ${name}`);
      return { error: name };
    }
  }
}