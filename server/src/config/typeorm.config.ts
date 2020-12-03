import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const {
  type,
  host,
  port,
  database,
  username,
  password,
  synchronize,
} = config.get('database');

export const typeormConfig: TypeOrmModuleOptions = {
  type: type,
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  synchronize: synchronize,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
