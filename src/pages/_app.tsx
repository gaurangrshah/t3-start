import { Auth, ErrorBoundary } from '@/components';
import { theme } from '@/theme';
import type { NextComponentTypeWithAuth, SessionWithUser } from '@/types';
import { trpc } from '@/utils/trpc';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps, type AppType } from 'next/app';
import Head from 'next/head';

const MyApp: AppType<{ session: SessionWithUser | null } & AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
  // eslint-disable-next-line no-unused-vars
  router,
}) => {
  const { auth } = Component as NextComponentTypeWithAuth;
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <SessionProvider session={session} refetchInterval={5 * 1000}>
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            {auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </ErrorBoundary>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
