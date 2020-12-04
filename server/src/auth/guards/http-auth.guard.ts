import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GUARD } from '../../config/context.constant';

@Injectable()
export class HttpAuthGuard extends AuthGuard('jwt') implements CanActivate {
  private readonly logger = new Logger(GUARD.HTTP);

  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    this.logger.debug(`Guarding JWT authorization`);

    const authHeader = context.switchToHttp().getRequest().headers
      .authorization as string;

    if (!authHeader) {
      this.logger.warn(`There is no JWT access token, access denied`);
      throw new BadRequestException('Authorization header not found.');
    }
    const [type, accessToken] = authHeader.split(' ');
    if (type !== 'Bearer') {
      this.logger.warn(`There is no Bearer type token, access denied`);
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }

    const { error } = await this.authService.validateJwtToken(accessToken);

    if (error) throw new UnauthorizedException(error);
    return true;
  }
}
