import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DATABASE } from './consts.config';

const { HOST, NAME, PASSWORD, PORT, SYNCHRONIZE, USERNAME } = DATABASE;

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  database: NAME,
  synchronize: SYNCHRONIZE,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
