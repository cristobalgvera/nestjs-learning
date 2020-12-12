import { ShoppingListActions } from '../store/actions';
import { ShoppingListContext } from '../contexts';
import { useContext } from 'react';
import { Product } from '../shared/interfaces';
import { ShoppingList } from '../store/interfaces';

const {
    addProduct,
    removeProduct,
    increaseProduct,
    decreaseProduct,
    checkProduct,
    uncheckProduct,
    clearList,
    setList,
} = ShoppingListActions;

export const useShoppingList = () => {
    const { shoppingList, dispatchShoppingList } = useContext(ShoppingListContext);

    const addItem = ( id: Product['id'] ) => {
        const product: Product = {
            id: id,
            name: `Mock product id: ${id}`,
            price: 5000,
            category: {
                id: "1",
                name: 'Test added category',
                products: []
            },
        };

        dispatchShoppingList(addProduct(product));
    };

    const removeItem = ( id: Product['id'] ) => {
        const product: Product = {
            id: id,
            name: `Mock product id: ${id}`,
            price: 5000,
            category: {
                id: "1",
                name: 'Test added category',
                products: []
            },
        };

        dispatchShoppingList(removeProduct(product));
    };

    const increaseItem = ( id: Product['id'] ) => {
        const product: Product = {
            id: id,
            name: `Mock product id: ${id}`,
            price: 5000,
            category: {
                id: "1",
                name: 'Test added category',
                products: []
            },        };

        dispatchShoppingList(increaseProduct(product));
    };

    const decreaseItem = ( id: Product['id'] ) => {
        const product: Product = {
            id: id,
            name: `Mock product id: ${id}`,
            price: 5000,
            category: {
                id: "1",
                name: 'Test added category',
                products: []
            },        };

        dispatchShoppingList(decreaseProduct(product));
    };

    const checkItemHandler = ( id: Product['id'], checked: boolean ) => {
        if (checked) _uncheckItem(id);
        else _checkItem(id);
    };

    const _checkItem = ( id: Product['id'] ) => {
        const product: Product = {
            id: id,
            name: `Mock product id: ${id}`,
            price: 5000,
            category: {
                id: "1",
                name: 'Test added category',
                products: []
            },        };

        dispatchShoppingList(checkProduct(product));
    };

    const _uncheckItem = ( id: Product['id'] ) => {
        const product: Product = {
            id: id,
            name: `Mock product id: ${id}`,
            price: 5000,
            category: {
                id: "1",
                name: 'Test added category',
                products: []
            },        };

        dispatchShoppingList(uncheckProduct(product));
    };

    const clearShoppingList = () => {
        dispatchShoppingList(clearList());
    };

    const setShoppingList = ( shoppingList: ShoppingList ) => {
        dispatchShoppingList(setList(shoppingList));
    };

    return {
        data: { ...shoppingList },
        logic: {
            addItem,
            removeItem,
            increaseItem,
            decreaseItem,
            checkItemHandler,
            clearShoppingList,
            setShoppingList,
        },
    };
};