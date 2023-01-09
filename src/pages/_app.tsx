import { ChakraProvider, ToastProps } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';

import type { NextComponentTypeWithAuth } from '@/types';
import type { AppType } from 'next/app';

import { AuthGate, AutoToast, ErrorBoundary } from '@/components';

import { theme } from '@/theme';
import { getParams } from '@/utils';
import { trpc } from '@/utils/trpc';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  // eslint-disable-next-line no-unused-vars
  router,
}) => {
  const { auth } = Component as NextComponentTypeWithAuth;

  const { success, error } = getParams(['error', 'success'], router.asPath);

  let status: ToastProps['status'];
  if (error) status = 'error';
  if (success) status = 'success';

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <ErrorBoundary>
        <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
            <AutoToast
              status={status}
              message={String(error) ?? String(success)}
            />
            {auth ? (
              <AuthGate>
                <Component {...pageProps} />
              </AuthGate>
            ) : (
              <Component {...pageProps} />
            )}
          </ChakraProvider>
        </SessionProvider>
      </ErrorBoundary>
    </>
  );
};

export default trpc.withTRPC(MyApp);
