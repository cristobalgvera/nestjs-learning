enum _ROUTE {
    LIST = 'list'
}

const _userProfile = ( username: string ) => `/${username}`;
const _userList = ( username: string ) => `${_userProfile(username)}/${_ROUTE.LIST}`;

export enum ROUTES {
    HOME = '/',
    SIGN_IN = '/sign-in',
}

export const userRoute = {
    profile: ( username: string ) => _userProfile(username),
    list: ( username: string ) => _userList(username),
};