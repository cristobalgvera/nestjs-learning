import { ShoppingList, ShoppingListActionType } from '../store/interfaces';
import { createContext, Dispatch, FunctionComponent, useReducer } from 'react';
import { initialShoppingListState, shoppingListReducer } from '../store/reducers';

interface ShoppingListContext {
    shoppingList: ShoppingList;
    dispatchShoppingList: Dispatch<ShoppingListActionType>
}

export const ShoppingListContext = createContext<ShoppingListContext>({
    shoppingList: initialShoppingListState,
    dispatchShoppingList: () => {
    },
});

export const ShoppingListContextProvider: FunctionComponent = ( { children } ) => {
    const [shoppingList, dispatchShoppingList] = useReducer(shoppingListReducer, initialShoppingListState);

    return (
        <ShoppingListContext.Provider value={{
            shoppingList,
            dispatchShoppingList,
        }}>
            {children}
        </ShoppingListContext.Provider>
    );
};