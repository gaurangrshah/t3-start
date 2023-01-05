import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCReact, httpBatchLink, loggerLink } from '@trpc/react-query';
import fetch from 'cross-fetch';
import { SessionProvider } from 'next-auth/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useState } from 'react';

import type { AppRouter } from '@/server/trpc/router/_app';

import { AuthGate } from '@/components';
import { theme } from '@/theme';
import { isEmpty } from '@/utils';
import { createMockRouter, mockRouter } from '@/__tests__/fixtures/mocks';
import { RenderOptions } from './render';

const logger = {
  log: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.log,
  warn: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.warn,
  // ✅ no more errors on the console for tests
  error: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.error,
};

const trpc = createTRPCReact<AppRouter>();

export function useClients() {
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
          fetch(url, opts) {
            return fetch(url, {
              ...opts,
              credentials: 'include',
            });
          },
        }),
      ],
    })
  );

  return { trpcClient, queryClient };
}

const ProviderPageProps = {
  cookies: 'string',
  session: null,
};

export function wrapper(options: RenderOptions = {}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    const { trpcClient, queryClient } = useClients();
    return (
      <RouterContext.Provider value={{ ...mockRouter, ...options.router }}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider
              session={options?.session ?? ProviderPageProps.session}
              refetchInterval={5 * 1000}
            >
              <ChakraProvider theme={theme}>{children}</ChakraProvider>
            </SessionProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </RouterContext.Provider>
    );
  };
}

export function authWrapper(options: RenderOptions = {}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    const { trpcClient, queryClient } = useClients();

    return (
      <RouterContext.Provider
        value={
          options?.router ? createMockRouter(options.router) : { ...mockRouter }
        }
      >
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider
              session={options?.session ?? ProviderPageProps.session}
              refetchInterval={5 * 1000}
            >
              <ChakraProvider theme={theme}>
                <AuthGate>{children}</AuthGate>
              </ChakraProvider>
            </SessionProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </RouterContext.Provider>
    );
  };
}
