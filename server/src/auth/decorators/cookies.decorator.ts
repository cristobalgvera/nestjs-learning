import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { DECORATOR } from '../../config/context.constant';

const logger = new Logger(DECORATOR.COOKIES);

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (data) logger.debug(`Obtaining cookie: ${data}`);
    else logger.debug('Obtaining all cookies');
    return data ? request.cookies?.[data] : request.cookies;
  },
);
