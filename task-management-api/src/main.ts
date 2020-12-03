import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MAIN } from './config/context.names';
import * as config from 'config';

const { NODE_ENV } = process.env;

async function bootstrap() {
  const { port } = config.get<any>('server');
  const listeningPort = process.env.PORT || port;

  const logger = new Logger(MAIN.BOOTSTRAP);
  const app = await NestFactory.create(AppModule);
  if (NODE_ENV === 'development') app.enableCors();
  await app.listen(listeningPort);

  logger.log(`Application listening on port ${listeningPort}`);
}

bootstrap();
