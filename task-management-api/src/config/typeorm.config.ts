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
} = config.get<any>('db');

const {
  RDS_HOSTNAME,
  RDS_PORT,
  RDS_USERNAME,
  RDS_PASSWORD,
  RDS_DB_NAME,
  TYPEORM_SYNC,
} = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: type,
  host: RDS_HOSTNAME || host,
  port: RDS_PORT || port,
  username: RDS_USERNAME || username,
  password: RDS_PASSWORD || password,
  database: RDS_DB_NAME || database,
  synchronize: TYPEORM_SYNC || synchronize,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
