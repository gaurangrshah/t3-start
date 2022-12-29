import { createTRPCNext } from '@trpc/next';
import superjson from 'superjson';

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { type AppRouter } from '../../server/trpc/router/_app';

import { getHeaders, links, queryClientConfig } from './config';

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    return {
      transformer: superjson,
      links,
      queryClientConfig,
      // To use SSR properly you need to forward the client's headers to the server
      headers: getHeaders(ctx),
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  // display all requests in brwoser network tab, if true requests only shown in server console
  ssr: false,
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
