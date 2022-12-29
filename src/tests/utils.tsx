import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import { render as defaultRender } from '@testing-library/react';
import { createTRPCReact,loggerLink } from '@trpc/react-query';
import fetch from 'cross-fetch';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { useState } from 'react';

import type { AppRouter } from '@/server/trpc/router/_app';
import type { NextRouter } from 'next/router';

import { theme } from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export const trpc = createTRPCReact<AppRouter>();

globalThis.fetch = fetch;

export * from './export-utils';

const logger = {
  log: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.log,
  warn: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.warn,
  // ✅ no more errors on the console for tests
  error: process.env.NEXT_PUBLIC_APP_ENV === 'test' ? () => {} : console.error,
};

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
        links: [loggerLink()],
      })
    );

    const ProviderPageProps = {
      cookies: 'string',
      session: null,
    };

    return (
      <RouterContext.Provider value={{ ...mockRouter, ...options.router }}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider
              session={ProviderPageProps.session}
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

/**
 * Overloads RTL's render function with our own. Adds a customizable mock for next/router.
 */
export function render(
  ui: RenderUI,
  { router = {}, ...options }: RenderOptions = {}
) {
  return defaultRender(ui, {
    wrapper: wrapper({ router }),
    ...options,
  });
}

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  forward: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: false,
  isPreview: false,
};

export function createMockRouter(router: Partial<NextRouter>) {
  return {
    ...mockRouter,
    ...router,
  };
}

const mockSession: Session = {
  id: '',
  email: '',
  image: '',
  expires: '', // new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
  accessToken: '',
};

export function createSession(session: Partial<Session>) {
  return {
    ...mockSession,
    ...session,
  };
}

type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & { router?: Partial<NextRouter> };
