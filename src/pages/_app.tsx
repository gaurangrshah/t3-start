import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import type { NextComponentTypeWithAuth, SessionWithUser } from '@/types';
import type { AppType } from 'next/app';

import { Auth, ErrorBoundary } from '@/components';
import { theme } from '@/theme';
import { trpc } from '@/utils/trpc';

const MyApp: AppType<{ session: SessionWithUser | null }> = ({
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
      <SessionProvider session={session}>
        <ErrorBoundary>
          <ChakraProvider theme={theme}>
            {auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </ChakraProvider>
        </ErrorBoundary>
      </SessionProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
