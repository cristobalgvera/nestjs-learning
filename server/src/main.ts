import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GLOBAL } from './config/context.constant';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

const { port } = config.get('server');
const logger = new Logger(GLOBAL.MAIN);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development')
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });

  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}

bootstrap();
