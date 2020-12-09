import { Product } from '../../shared/interfaces';
import { ShoppingList, ShoppingListActionType } from '../interfaces';

export const addProduct = ( product: Product ): ShoppingListActionType => ({
    type: 'ADD_PRODUCT',
    payload: { products: [product] },
});

export const removeProduct = ( product: Product ): ShoppingListActionType => ({
    type: 'REMOVE_PRODUCT',
    payload: { products: [product] },
});

export const increaseProduct = ( product: Product ): ShoppingListActionType => ({
    type: 'INCREASE_PRODUCT',
    payload: { products: [product] },
});

export const decreaseProduct = ( product: Product ): ShoppingListActionType => ({
    type: 'DECREASE_PRODUCT',
    payload: { products: [product] },
});

export const checkProduct = ( product: Product ): ShoppingListActionType => ({
    type: 'CHECK_PRODUCT',
    payload: { products: [product] },
});

export const uncheckProduct = ( product: Product ): ShoppingListActionType => ({
    type: 'UNCHECK_PRODUCT',
    payload: { products: [product] },
});

export const clearList = (): ShoppingListActionType => ({
    type: 'CLEAR_LIST',
});

export const setList = ( shoppingList: ShoppingList ): ShoppingListActionType => ({
    type: 'SET_LIST',
    payload: shoppingList,
});