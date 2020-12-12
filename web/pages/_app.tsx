import { AppProps } from 'next/app';
import '../shared/styles/globals.scss';
import Routes from '../components/Routes/Routes';
import GeneralContextProvider from '../contexts/GeneralContextProvider';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../shared/services/apollo-client';

function App( { Component, pageProps }: AppProps ) {
    return (
        <ApolloProvider client={apolloClient}>
            <GeneralContextProvider>
                <Routes/>
                <Component {...pageProps}/>
            </GeneralContextProvider>
        </ApolloProvider>
    );
}

export default App;