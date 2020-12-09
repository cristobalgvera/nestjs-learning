import { Identifiable } from '../../../shared/interfaces';
import { ProductInList } from '../index';

export interface IShoppingList extends Partial<Identifiable> {
    products: ProductInList[];
}