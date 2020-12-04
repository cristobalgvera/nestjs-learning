import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { DECORATOR } from '../../config/context.constant';
import { HttpContext } from '../interfaces';

const logger = new Logger(DECORATOR.GRAPHQL_HTTP_CONTEXT);

export const GraphQLHttpContext = createParamDecorator(
  (_, context: ExecutionContext) => {
    const httpContext: HttpContext = context.getArgs()[2];
    logger.debug('Getting http context');
    return httpContext;
  },
);
