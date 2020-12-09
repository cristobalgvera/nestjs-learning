import { Controller, Post, UseGuards } from '@nestjs/common';
import { Cookies, HttpContextDecorator } from './decorators';
import * as config from 'config';
import { HttpContext } from './interfaces';
import { AuthService } from './auth.service';
import { HttpAuthGuard } from './guards';

const {
  cookie: { name },
} = config.get('storage');

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh_token')
  @UseGuards(HttpAuthGuard)
  refreshToken(
    @Cookies(name) refreshToken: string,
    @HttpContextDecorator() httpContext: HttpContext,
  ) {
    return this.authService.validateJwtRefreshToken(refreshToken, httpContext);
  }
}
