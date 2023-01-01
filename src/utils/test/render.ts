import { render as defaultRender } from '@testing-library/react';
import type { Session } from 'next-auth';
import type { NextRouter } from 'next/router';

import { wrapper } from './wrapper';
export * from '@testing-library/react'; // export rtl from here so we can override below

/**
 * Overloads RTL's render function with our own. Adds a customizable mock for next/router.
 */
export function render(
  ui: RenderUI,
  { router = {}, session = null, ...options }: RenderOptions = {}
) {
  return defaultRender(ui, {
    wrapper: wrapper({ router, session }),
    ...options,
  });
}

type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & {
  router?: Partial<NextRouter>;
  session?: Session | null;
};
