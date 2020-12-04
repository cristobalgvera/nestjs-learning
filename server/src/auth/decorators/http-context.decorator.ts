import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { DECORATOR } from '../../config/context.constant';
import { HttpContext } from '../interfaces';

const logger = new Logger(DECORATOR.HTTP_CONTEXT);

export const HttpContextDecorator = createParamDecorator(
  (_, context: ExecutionContext) => {
    const httpContext: HttpContext = {
      res: context.switchToHttp().getResponse(),
      req: context.switchToHttp().getRequest(),
    };
    logger.debug('Getting http context');
    return httpContext;
  },
);
