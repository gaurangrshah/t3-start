import { ChakraProvider } from '@chakra-ui/react';
import { render } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import type { NextComponentTypeWithAuth } from '@/types';
import type { RenderOptions } from '@testing-library/react';
import type { NextComponentType } from 'next';
import type { Session } from 'next-auth';
import type { AppType } from 'next/app';

import { Auth } from '@/components';
import { theme } from '@/theme';

export const AllProviders: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  // eslint-disable-next-line no-unused-vars
  router,
}) => {
  const { auth } = Component as NextComponentTypeWithAuth;
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        {auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </ChakraProvider>
  );
};

// https://github.com/testing-library/react-testing-library/issues/634
type CustomOptions = RenderOptions<
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  typeof import('@testing-library/dom/types/queries'),
  HTMLElement,
  HTMLElement
>;

export function wrappedRender(ui: JSX.Element, options?: CustomOptions) {
  const returns = render(ui, {
    wrapper: AllProviders as NextComponentType,
    ...options,
  });

  return { ...returns };
}
