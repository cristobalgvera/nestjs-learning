import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GLOBAL } from './config/context.constant';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';

const { port } = config.get('server');
const logger = new Logger(GLOBAL.MAIN);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') app.enableCors();
  app.use(cookieParser());

  await app.listen(port);
  logger.log(`Listening on port ${port}`);
}

bootstrap();
