import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DECORATOR } from '../../config/context.constant';

const logger = new Logger(DECORATOR.CURRENT_USER);

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    logger.debug('Getting current user from context');
    return ctx.getContext().req.user;
  },
);
