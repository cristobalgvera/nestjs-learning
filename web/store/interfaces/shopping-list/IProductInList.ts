import { Product } from '../../../shared/interfaces';

export interface IProductInList extends Product {
    checked: boolean;
    amount: number;
}