import { render as defaultRender } from '@testing-library/react';
import type { RenderOptions, RenderUI } from './wrapper';

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
