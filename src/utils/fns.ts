import type { Obj } from '@/types';
import type { SyntheticEvent } from 'react';
import { isClient, PORT } from './constants';

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${(PORT || process.env.SERVER_PORT) ?? 3000}`; // dev SSR should use localhost
};

/**
 *
 *
 * @export
 * @param {string[]} paramKeys
 * @param {string} asPath
 * @return {*}  {Obj}
 */
export function getParams(paramKeys: string[], asPath: string): Obj {
  const params = new URLSearchParams(`${asPath}`);
  return paramKeys.reduce((obj, curr) => {
    return Object.assign({ ...obj, [curr]: params.get(curr) });
  }, {});
}

/**
 *
 *
 * @export
 * @template T
 * @param {(event: SyntheticEvent) => Promise<T>} promise
 * @return {*}
 */
export function onPromise<T>(
  // used to wrap react-hook-forms's submit handler
  // https://github.com/react-hook-form/react-hook-form/discussions/8020#discussioncomment-3429261
  // eslint-disable-next-line no-unused-vars
  promise: (event: SyntheticEvent) => Promise<T>
) {
  return (event: SyntheticEvent) => {
    if (promise) {
      promise(event).catch((error) => {
        console.error('Unexpected error', error);
      });
    }
  };
}

export const wait = (delay?: number) => {
  // https://appdividend.com/2022/06/10/javascript-wait/#:~:text=JavaScript%20wait%20To%20make%20your%20JavaScript%20code%20wait%2C,need%20to%20use%20the%20await%20keyword%20with%20it.
  return new Promise((r) => setTimeout(r, delay || 1000));
};

export function getUsernameFromEmail(
  email: string | null | undefined
): string | null {
  const splitEmail = email ? email.split('@')[0] : null;
  return splitEmail ?? null;
}

/**
 * @params {array} array - array of objects to flatten
 * @params {string} key - key to flatten on
 * @returns {array} - of objects
 */
export function flattenObjects<T, U>(arr: T[], key = 'label') {
  if (!arr?.length) throw new Error(`cannot flatten ${JSON.stringify(arr)}`);
  const object = arr?.reduce(
    // @ts-expect-error: item[key] - @TODO: implicit any - how to type?
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    (obj, item) => Object.assign(obj, { [item[key]]: item.value }),
    {}
  );
  return object as U;
}

export function getAnonId() {
  if (!isClient) return undefined;
  return localStorage.getItem('__anon_id');
}

/**
 * * @SEE: https://stackoverflow.com/a/20728864
 *
 * @export
 * @param {number} [end=12]
 * @return {*}
 */
export function generateRandomString(end = 12) {
  return Math.random().toString(36).substring(3, end);
}

export const getSearchQuery = (searchParams: URLSearchParams) => {
  const query: Record<string, string> = {};
  const entries = searchParams.entries();
  for (const [key, value] of entries) query[key] = value;
  return query;
};

export const composeUrl = (url: string, params: Record<string, any>) => {
  const composedUrl = new URL(url);
  return new URL(
    `${composedUrl.origin}${composedUrl.pathname}?${new URLSearchParams([
      ...Array.from(composedUrl.searchParams.entries()),
      ...Object.entries(params),
    ])}`
  );
};

export const numberFormater = (number: number) =>
  new Intl.NumberFormat().format(number);

export const currencyFormatter = (value: number, currency = 'NGN') => {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency }).format(
    value
  );
};

export function addDays(date: Date, days: number): Date {
  // https://stackoverflow.com/questions/563406/how-to-add-days-to-date
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function dateToSeconds(datestamp: Date): number {
  const dateSecondsAsFloat = new Date(datestamp).getTime() / 1000;
  return Math.floor(dateSecondsAsFloat);
}

export function secondsToDate(seconds: number) {
  return new Date(seconds * 1000);
}
