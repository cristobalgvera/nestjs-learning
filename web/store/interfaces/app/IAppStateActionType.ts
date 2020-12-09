import { APP_STATE_ACTIONS } from '../../actions/actionTypes';
import { AppState } from '../index';

export interface IAppStateActionType {
    type: keyof typeof APP_STATE_ACTIONS;
    payload?: AppState | {};
}