import { type AppType } from 'next/app';
import type { SessionWithUser, NextComponentTypeWithAuth } from '@/types';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/theme';
import { Auth, ErrorBoundary } from '@/components';
import { trpc } from '@/utils/trpc';

const MyApp: AppType<{ session: SessionWithUser | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
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
