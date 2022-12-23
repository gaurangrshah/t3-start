// time helpers
export const ONE_SECOND = 1000;
export const ONE_MIN = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MIN;
export const ONE_DAY = 24 * ONE_HOUR;
export const THIRTY_DAYS = 30 * ONE_DAY;
// config settings
export const PORT = 3000;
export const ACCESS_TOKEN_EXPIRES_IN = 15;
export const REFRESH_TOKEN_EXPIRES_IN = 60;
export const REDIS_CACHE_EXPIRES_INT = 60;
// export const MAX_BATCH_SIZE = 10;
export const DEFAULT_STALE_TIME: number = 5 * ONE_SECOND; // 5secs

export const isBrowser = typeof window !== 'undefined';
export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';
export const isClient = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export const debug = isDev && false;

export const NEXT_AUTH_SESSION_TOKEN_KEY = process.env.SESSION_COOKIE_NAME;

export const EPOCH_STAMP = new Date('1/1/1970');

// testing
export const TEST_ENV = process.env.NEXT_PUBLIC_APP_ENV === 'test';
