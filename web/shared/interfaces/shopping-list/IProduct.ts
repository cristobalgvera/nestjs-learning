import { Identifiable } from '../index';

export interface IProduct extends Identifiable {
    name: string;
    price: number;
    imgUrl?: string;
}