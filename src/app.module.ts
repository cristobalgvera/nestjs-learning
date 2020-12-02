import { Module } from '@nestjs/common';
import { UrlModule } from './url/url.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';

@Module({
  imports: [UrlModule, TypeOrmModule.forRoot(typeormConfig)],
})
export class AppModule {}
