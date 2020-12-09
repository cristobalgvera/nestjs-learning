import { AppState, AppStateActionType } from '../interfaces';
import { updateState } from '../../shared/util/updateState';

type Payload = AppStateActionType['payload'];

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
            throw new Error('Wrong action type');
    }
}

const userLogin = ( state: AppState, payload: Payload ) => {
    if (payload && 'user' in payload) {
        const { user } = payload;
        return updateState(state, { user });
    }
};

const userLogout = ( state: AppState ) => {
    return updateState(state, { user: initialAppState.user });
};