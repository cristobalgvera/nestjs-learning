import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER } from './config/consts.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { APP_CONTEXT } from './shared/enums/contexts.enum';
import * as helmet from 'helmet';

const { PORT } = SERVER;

const logger = new Logger(APP_CONTEXT.MAIN);

async function bootstrap() {
  logger.log('Bootstrap function initialization');
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

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
  logger.log(`Application running in port ${PORT}`);
}

bootstrap();
