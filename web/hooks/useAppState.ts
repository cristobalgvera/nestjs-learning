import { useCallback, useContext } from 'react';
import { AppStateActions } from '../store/actions';
import { AppStateContext } from '../contexts';
import { Credential, User } from '../shared/interfaces';

const {
    userLogin,
    userLogout,
} = AppStateActions;

export const useAppState = () => {
    const { appState, dispatchAppState } = useContext(AppStateContext);

    const login = useCallback(( { username, password }: Credential ) => {
        const user: User = {
            id: 18,
            username: username,
            email: password,
        };
        dispatchAppState(userLogin(user));
    }, []);

    const logout = useCallback(() => {
        dispatchAppState(userLogout());
    }, []);

    return {
        data: { ...appState },
        logic: { login, logout },
    };
};