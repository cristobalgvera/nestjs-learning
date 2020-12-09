import { createContext, Dispatch, FunctionComponent, useReducer } from 'react';
import { AppState, AppStateActionType } from '../store/interfaces';
import { appStateReducer, initialAppState } from '../store/reducers';

interface AppStateContext {
    appState: AppState;
    dispatchAppState: Dispatch<AppStateActionType>
}

export const AppStateContext = createContext<AppStateContext>({
    appState: initialAppState,
    dispatchAppState: () => {
    },
});

export const AppStateContextProvider: FunctionComponent = ( { children } ) => {
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