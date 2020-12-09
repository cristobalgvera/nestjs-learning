import { AppState, AppStateActionType } from '../interfaces';
import { updateState } from '../../shared/util/updateState';

type AppStatePayload = AppStateActionType['payload'];

export const initialAppState: AppState = {
    user: {
        id: 0,
        username: '',
        email: '',
    },
};

export function appStateReducer( state: AppState, { type, payload }: AppStateActionType ): AppState {
    switch (type) {
        case 'USER_LOGIN':
            return userLogin(state, payload);
        case 'USER_LOGOUT':
            return userLogout(state);
        default:
            throw new Error(`Error while reducing app state`);
    }
}

const userLogin = ( state: AppState, payload: AppStatePayload ) => {
    if (payload && 'user' in payload) {
        const { user } = payload;
        return updateState(state, { user });
    }
};

const userLogout = ( state: AppState ) => {
    return updateState(state, { user: initialAppState.user });
};