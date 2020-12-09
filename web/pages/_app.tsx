import { AppProps } from 'next/app';
import '../shared/styles/globals.scss';
import Routes from '../components/Routes/Routes';
import AppStateContextProvider from '../contexts/AppStateContext';

function App( { Component, pageProps }: AppProps ) {
    return (
        <AppStateContextProvider>
            <Routes/>
            <Component {...pageProps}/>
        </AppStateContextProvider>
    );
}

export default App;