import { AppProps } from 'next/app';
import '../shared/styles/globals.scss';
import Routes from '../components/Routes/Routes';
import GeneralContextProvider from '../contexts/GeneralContextProvider';

function App( { Component, pageProps }: AppProps ) {
    return (
        <GeneralContextProvider>
            <Routes/>
            <Component {...pageProps}/>
        </GeneralContextProvider>
    );
}

export default App;