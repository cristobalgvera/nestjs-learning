import { ProductInList, ShoppingList, ShoppingListActionType } from '../interfaces';
import { updateState } from '../../shared/util/updateState';

type ShoppingListPayload = ShoppingListActionType['payload'];

export const initialShoppingListState: ShoppingList = {
    products: [],
};

export function shoppingListReducer( state: ShoppingList, { type, payload }: ShoppingListActionType ) {
    switch (type) {
        case 'ADD_PRODUCT':
            return addProduct(state, payload);
        case 'REMOVE_PRODUCT':
            return removeProduct(state, payload);
        case 'INCREASE_PRODUCT':
            return increaseProduct(state, payload);
        case 'DECREASE_PRODUCT':
            return decreaseProduct(state, payload);
        case 'CHECK_PRODUCT':
            return checkProduct(state, payload);
        case 'UNCHECK_PRODUCT':
            return uncheckProduct(state, payload);
        case 'CLEAR_LIST':
            return clearList(state);
        case 'SET_LIST':
            return setList(state, payload);
        default:
            throw new Error(`Error while reducing shopping list`);
    }
}

const initialProductInListState: ProductInList = {
    id: undefined,
    name: '',
    price: 0,
    amount: 0,
    checked: false,
};

const addProduct = ( state: ShoppingList, payload: ShoppingListPayload ) => {
    if ('products' in payload) {
        const { products } = state;
        const { products: _products } = payload;
        const product = { ..._products[0] };

        const newProduct: ProductInList = updateState(initialProductInListState, product);

        return updateState(state, {
            products: [...products, newProduct],
        });
    }
};

const removeProduct = ( state: ShoppingList, payload: ShoppingListPayload ) => {
    if ('products' in payload) {
        const { products } = state;
        const { products: _products } = payload;
        const { id } = { ..._products[0] };

        return updateState(state, {
            products: products.filter(_product => _product.id !== id),
        });
    }
};

const increaseProduct = ( state: ShoppingList, payload: ShoppingListPayload ) => {
    if ('products' in payload) {
        const { products } = state;
        const { products: _products } = payload;
        const { id } = { ..._products[0] };

        const updatedProducts = products.map(_product => {
            if (_product.id === id)
                ++_product.amount;

            return _product;
        });

        return updateState(state, {
            products: updatedProducts,
        });
    }
};

const decreaseProduct = ( state: ShoppingList, payload: ShoppingListPayload ) => {
    if ('products' in payload) {
        const { products } = state;
        const { products: _products } = payload;
        const { id } = { ..._products[0] };

        const updatedProducts = products.map(_product => {
            if (_product.id === id && _product.amount > 0)
                --_product.amount;

            return _product;
        });

        return updateState(state, {
            products: updatedProducts,
        });
    }
};

const checkProduct = ( state: ShoppingList, payload: ShoppingListPayload ) => {
    if ('products' in payload) {
        const { products } = state;
        const { products: _products } = payload;
        const { id } = { ..._products[0] };

        const updatedProducts = products.map(_product => {
            if (_product.id === id)
                _product.checked = true;

            return _product;
        });

        return updateState(state, {
            products: updatedProducts,
        });
    }
};

const uncheckProduct = ( state: ShoppingList, payload: ShoppingListPayload ) => {
    if ('products' in payload) {
        const { products } = state;
        const { products: _products } = payload;
        const { id } = { ..._products[0] };

        const updatedProducts = products.map(_product => {
            if (_product.id === id)
                _product.checked = false;

            return _product;
        });

        return updateState(state, {
            products: updatedProducts,
        });
    }
};

const clearList = ( state: ShoppingList ) => {
    return updateState(state, {
        products: initialShoppingListState.products,
    });
};

const setList = ( state: ShoppingList, payload: ShoppingListPayload ) => {
    if ('id' in payload)
        return updateState(state, payload);
};