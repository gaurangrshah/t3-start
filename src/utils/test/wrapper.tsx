import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render as defaultRender } from '@testing-library/react';
import { createTRPCReact, httpBatchLink, loggerLink } from '@trpc/react-query';
import fetch from 'cross-fetch';
import { SessionProvider } from 'next-auth/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useState } from 'react';

import type { AppRouter } from '@/server/trpc/router/_app';
import type { Session } from 'next-auth';
import type { NextRouter } from 'next/router';

import { AuthGate } from '@/components';
import { theme } from '@/theme';
import { mockRouter } from '@/__tests__/fixtures/mocks';

export type DefaultParams = Parameters<typeof defaultRender>;
export type RenderUI = DefaultParams[0];
export type RenderOptions = DefaultParams[1] & {
  router?: Partial<NextRouter>;
  session?: Session | null;
  auth?: boolean;
};

const logger = {
  log: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.log,
  warn: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.warn,
  // ✅ no more errors on the console for tests
  error: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.error,
};

export const trpc = createTRPCReact<AppRouter>();

export function wrapper(options: RenderOptions = {}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
      () =>
        new QueryClient({
          logger,
          defaultOptions: {
            queries: {
              retry: false,
            },
          },
        })
    );

    const [trpcClient] = useState(() =>
      trpc.createClient({
        links: [
          loggerLink({
            enabled(opts) {
              return false; // disable auto logging for tests
            },
          }),
          httpBatchLink({
            url: `http://localhost:3000/api/trpc`,
            fetch(url, options) {
              return fetch(url, {
                ...options,
                credentials: 'include',
              });
            },
          }),
        ],
      })
    );

    const ProviderPageProps = {
      cookies: 'string',
      session: null,
      auth: false,
    };

    const auth = options?.auth ?? ProviderPageProps.auth;

    return (
      <RouterContext.Provider value={{ ...mockRouter, ...options.router }}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider
              session={options?.session ?? ProviderPageProps.session}
              refetchInterval={5 * 1000}
            >
              <ChakraProvider theme={theme}>
                {auth ? <AuthGate>{children}</AuthGate> : children}
              </ChakraProvider>
            </SessionProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </RouterContext.Provider>
    );
  };
}
