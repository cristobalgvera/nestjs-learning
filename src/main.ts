import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { MAIN } from './config/context.names';

const listeningPort = 8081;

async function bootstrap() {
  const logger = new Logger(MAIN.BOOTSTRAP);
  const app = await NestFactory.create(AppModule);
  await app.listen(listeningPort);

  logger.log(`Application listening on port ${listeningPort}`);
}

bootstrap();
