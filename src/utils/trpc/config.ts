import { httpBatchLink,loggerLink } from '@trpc/client';
import fetch from 'cross-fetch';
import { NextPageContext } from 'next';
import { DEFAULT_STALE_TIME, ONE_DAY } from '../constants';
import { getBaseUrl } from '../fns';

export const links = [
  loggerLink({
    enabled: (opts) =>
      process.env.NODE_ENV === 'development' ||
      (opts.direction === 'down' && opts.result instanceof Error),
  }),
  httpBatchLink({
    url: `${getBaseUrl()}/api/trpc`,
    fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: 'include',
      });
    },
  }),
];

export const queryClientConfig = {
  defaultOptions: { queries: { staleTime: DEFAULT_STALE_TIME } },
};

export const getHeaders = (ctx: NextPageContext | undefined) => {
  if (ctx?.req) {
    const headers = ctx?.req?.headers;
    delete headers?.connection;
    return {
      ...headers,
      'x-ssr': '1',
    };
  }
  return {};
};

export const headers = {
  // unused
  'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY}`,
};
