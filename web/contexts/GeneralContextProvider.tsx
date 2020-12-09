import { FunctionComponent } from 'react';
import { AppStateContextProvider, ShoppingListContextProvider } from './index';

const GeneralContextProvider: FunctionComponent = ( { children } ) => (
    <AppStateContextProvider>
        <ShoppingListContextProvider>
            {children}
        </ShoppingListContextProvider>
    </AppStateContextProvider>
);

export default GeneralContextProvider;