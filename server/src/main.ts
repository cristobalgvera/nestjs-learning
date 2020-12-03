import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { GLOBAL } from './config/context.constant';
import * as config from 'config';

const { port } = config.get('server');
const logger = new Logger(GLOBAL.MAIN);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  logger.log(`Listening on port ${port}`);
}

bootstrap();
