import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'task-management',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
  // logger: 'advanced-console',
  // logging: true,
};
