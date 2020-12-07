let accessToken = '';

export const setAccessToken = ( value: string ) => {
    accessToken = value;
};

export const getAccessToken = () => accessToken;