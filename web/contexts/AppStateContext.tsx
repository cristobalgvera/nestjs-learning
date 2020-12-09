import { createContext, Dispatch, FunctionComponent, useReducer } from 'react';
import { AppState } from '../store/interfaces';
import { appStateReducer, initialAppState } from '../store/reducers';

interface AppStateContext {
    appState: AppState;
    dispatchAppState: Dispatch<any>
}

export const AppStateContext = createContext<AppStateContext>({
    appState: initialAppState,
    dispatchAppState: () => {
    },
});

const AppStateContextProvider: FunctionComponent = ( { children } ) => {
    const [appState, dispatchAppState] = useReducer(appStateReducer, initialAppState);

    return (
        <AppStateContext.Provider value={{
            appState,
            dispatchAppState,
        }}>
            {children}
        </AppStateContext.Provider>
    );
};

export default AppStateContextProvider;