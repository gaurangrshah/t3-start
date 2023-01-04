import { render as defaultRender } from '@testing-library/react';

import type { Session } from 'next-auth';
import type { NextRouter } from 'next/router';

// import { isEmpty } from '@/utils';
import { authWrapper, wrapper } from './wrapper';

export * from '@testing-library/react'; // export rtl from here so we can override below

export type DefaultParams = Parameters<typeof defaultRender>;
export type RenderUI = DefaultParams[0];
export type RenderOptions = DefaultParams[1] & {
  router?: Partial<NextRouter>;
  session?: Session | null;
};

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

export function renderWithAuthGate(
  ui: RenderUI,
  { router = {}, session = null, ...options }: RenderOptions = {}
) {
  return defaultRender(ui, {
    wrapper: authWrapper({ router, session }),
    ...options,
  });
}
