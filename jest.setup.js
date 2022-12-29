// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom

// import { createSerializer } from '@emotion/jest';

import util from 'util';

// expect.addSnapshotSerializer(createSerializer());
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

/**
 ** @SEE: https://github.com/mthomps4/trpc-next-auth-spike/blob/main/tests/jest.setup.js

 ** example of separating test database and see jest.teardown.js
 */
