import { ApolloProvider } from '@apollo/client';
import { SocketProvider } from '@contexts';
import favicon from '@images/favicon.ico';
import store, { persistor, wrapper } from '@stores/app';
import { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { useApollo } from '../ApolloClient';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const apolloClient = useApollo(pageProps);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href={favicon.src} />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider session={session}>
              <SocketProvider>{getLayout(<Component {...pageProps} />)}</SocketProvider>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </>
  );
};

export default wrapper.withRedux(MyApp);
