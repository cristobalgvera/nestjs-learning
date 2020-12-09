import { Identifiable } from '../index';

export interface IUser extends Identifiable{
    username: string;
    email: string;
    name?: string;
}