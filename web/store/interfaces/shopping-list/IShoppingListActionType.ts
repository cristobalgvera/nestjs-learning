import { SHOPPING_LIST_ACTIONS } from '../../actions/actionTypes';
import { ShoppingList } from '../index';

export interface IAppStateActionType {
    type: keyof typeof SHOPPING_LIST_ACTIONS;
    payload?: ShoppingList | {};
}