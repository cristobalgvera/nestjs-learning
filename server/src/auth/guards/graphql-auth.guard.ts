import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { GUARD } from '../../config/context.constant';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') implements CanActivate {
  private readonly logger = new Logger(GUARD.GRAPHQL);

  constructor(private readonly authService: AuthService) {
    super();
  }

  getRequest(context: ExecutionContext) {
    this.logger.debug(`Getting request context`);
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    this.logger.debug(`Guarding JWT authorization`);

    const { req } = context.getArgs()[2];
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
      this.logger.warn(`There is no JWT access token, access denied`);
      throw new BadRequestException('Authorization access token not found.');
    }
    const [type, accessToken] = authHeader.split(' ');
    if (type !== 'Bearer') {
      this.logger.warn(`There is no Bearer type token, access denied`);
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }

    const { error, user } = await this.authService.validateJwtToken(
      accessToken,
    );

    if (error) throw new UnauthorizedException(error);

    req.user = user;
    return true;
  }
}
