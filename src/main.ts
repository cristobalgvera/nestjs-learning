import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MAIN } from './config/context.names';
import * as config from 'config';

async function bootstrap() {
  const { port } = config.get<any>('server');
  const listeningPort = process.env.PORT || port;

  const logger = new Logger(MAIN.BOOTSTRAP);
  const app = await NestFactory.create(AppModule);
  await app.listen(listeningPort);

  logger.log(`Application listening on port ${listeningPort}`);
}

bootstrap();
