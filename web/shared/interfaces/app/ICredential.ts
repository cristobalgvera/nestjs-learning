import { User } from '../index';

export interface ICredential {
    username: User['username'];
    password: string;
}