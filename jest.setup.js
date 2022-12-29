// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
/**
 * NOT USED: currently using a default setup -- this doesnt seem to be required for this project
 */

// import { createSerializer } from '@emotion/jest';

import util from 'util';

// expect.addSnapshotSerializer(createSerializer());
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

/**
 ** @SEE: https://github.com/mthomps4/trpc-next-auth-spike/blob/main/tests/jest.setup.js

 ** example of separating test database and see jest.teardown.js
 */
