import { useEffect } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import AppLayout from '../layouts/AppLayout';
import {Provider} from "react-redux";
import store from "../app/store";

const MyApp = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if(jssStyles){
            jssStyles.parentElement!.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Provider store={store}>
            <AppLayout>
                <Head>
                    <title>Wish Work</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>
                <Component {...pageProps} />
            </AppLayout>
            </Provider>
        </>
    );
};

export default MyApp;
