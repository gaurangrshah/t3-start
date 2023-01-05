/**
 * @ SEE: https://tinyurl.com/2j29z5mb
 */

import EventEmitter from 'events';

import singletonRouter, { type NextRouter } from 'next/router';

export const nextRouterMocked = jest.mock('next/router', () => ({
  __esModule: true,
  // ...jest.requireActal('next/router'),
  useRouter() {
    return createMockRouter(mockRouter);
  },
}));

const emitter = new EventEmitter();

export const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  forward: jest.fn().mockResolvedValue(true),
  push: jest.fn().mockResolvedValue(true),
  replace: jest.fn().mockResolvedValue(true),
  reload: jest.fn().mockResolvedValue(true),
  back: jest.fn().mockResolvedValue(true),
  prefetch: jest.fn(() => Promise.resolve()),
  beforePopState: jest.fn().mockResolvedValue(true),
  events: {
    on: jest.fn().mockImplementation(emitter.on),
    off: jest.fn().mockImplementation(emitter.on),
    emit: jest.fn().mockImplementation(emitter.on),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: false,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
};

export function createMockRouter(router: Partial<NextRouter>) {
  return {
    ...mockRouter,
    ...router,
  };
}

export const cleanEvents = () => emitter.removeAllListeners();
