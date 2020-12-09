import * as config from 'config';

const {
  type,
  port: dbPort,
  database,
  host,
  username,
  password,
  synchronize,
} = config.get('database');
const { port } = config.get('server');

export const SERVER = {
  PORT: port as number,
};

export const DATABASE = {
  TYPE: type as string,
  PORT: dbPort as number,
  NAME: database as string,
  HOST: host as string,
  USERNAME: username as string,
  PASSWORD: password as string,
  SYNCHRONIZE: synchronize as boolean,
};
