import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

import { config } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingState } from "../components/shared/LoadingState";
// Tell Font Awesome to skip adding the CSS automatically
// since it's already imported above
config.autoAddCss = false;
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    const theme = "smoments";
    useEffect(() => {
        const body = document.body;
        body.setAttribute("data-theme", theme);
    }, [theme]);
    const persistor = persistStore(store);
    return (
        <Provider store={store}>
            <PersistGate loading={<div className="h-screen w-screen"><LoadingState /></div>} persistor={persistor}>
                <MeshProvider>
                    <Head>
                        <title>Specials Moments APP</title>
                        <meta property="og:title" content="Specials Moments APP" key="title" />
                        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
                        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
                        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
                        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
                        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
                        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
                        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
                        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
                        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
                        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png" />
                        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                        <link rel="manifest" href="/manifest.json" />
                        <meta name="msapplication-TileColor" content="#ffffff" />
                        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                        <meta name="theme-color" content="#ffffff" />
                    </Head>
                    <Component {...pageProps} />
                </MeshProvider>
            </PersistGate>
        </Provider>
    );
}
