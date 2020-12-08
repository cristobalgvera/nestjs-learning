import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from '../common/accessToken';

const httpLink = createHttpLink({
    uri: 'http://localhost:8081/graphql',
});

const authLink = setContext(( _, { headers } ) => {
    const accessToken = getAccessToken();
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include',
});