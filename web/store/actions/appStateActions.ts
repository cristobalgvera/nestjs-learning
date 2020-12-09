import { AppStateActionType } from '../interfaces';
import { User } from '../../shared/interfaces';

export const userLogin = ( user: User ): AppStateActionType => ({
    type: 'USER_LOGIN',
    payload: { user },
});

export const userLogout = (): AppStateActionType => ({
    type: 'USER_LOGOUT',
});