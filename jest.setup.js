// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import childProcess from 'child_process';
import util from 'util';
const exec = util.promisify(childProcess.exec);

// jest.mock('next-auth/react');

global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

/**
 ** @SEE: https://github.com/mthomps4/trpc-next-auth-spike/blob/main/tests/jest.setup.js

 ** example of separating test database and see jest.teardown.js
 */
