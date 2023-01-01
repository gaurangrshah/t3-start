// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom

import '@testing-library/jest-dom';

import util from 'util';

import { cleanEvents, cleanup, server } from '@/utils/test';

global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

/**
 ** @SEE: https://github.com/mthomps4/trpc-next-auth-spike/blob/main/tests/jest.setup.js

 ** example of separating test database and see jest.teardown.js
 */

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterAll(() => {
  server.close();
  cleanEvents();
});

beforeEach(() => {
  jest.clearAllMocks();
});
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
  return cleanup();
});
