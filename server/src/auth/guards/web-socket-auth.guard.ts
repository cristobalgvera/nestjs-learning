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
export class WebSocketAuthGuard
  extends AuthGuard('jwt')
  implements CanActivate {
  private readonly logger = new Logger(GUARD.WEB_SOCKET);

  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    /*
      Since a GraphQl subscription uses Websockets,
      we can't pass any headers. So we pass the token inside the query itself
    */

    this.logger.debug(`Guarding JWT authorization`);

    const accessToken = context.switchToWs().getData().token;

    if (!accessToken) {
      this.logger.warn(`There is no JWT access token, access denied`);
      throw new BadRequestException('Authentication token not found.');
    }

    const { error } = await this.authService.validateJwtAccessToken(accessToken);

    if (error) throw new UnauthorizedException(error);
    return true;
  }
}
