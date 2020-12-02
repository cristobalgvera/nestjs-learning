import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'url-shortener',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};
