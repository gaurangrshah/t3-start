import { Auth } from '@/components';
import { theme } from '@/theme';
import type { NextComponentTypeWithAuth, SessionWithUser } from '@/types';
import { ChakraProvider } from '@chakra-ui/react';
import { render, type RenderOptions } from '@testing-library/react';
import type { NextComponentType } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppType } from 'next/app';

export const AllProviders: AppType<{ session: SessionWithUser | null }> = ({
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
