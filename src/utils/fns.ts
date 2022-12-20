import type { SyntheticEvent } from 'react';
import { isClient } from './constants';

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/**
 *
 *
 * @export
 * @param {Date} date
 * @param {number} days
 * @return {*}  {Date}
 */
export function addDays(date: Date, days: number): Date {
  // https://stackoverflow.com/questions/563406/how-to-add-days-to-date
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
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
