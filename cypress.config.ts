import { defineConfig } from 'cypress';
import { getBaseUrl } from './src/utils/fns';

const baseUrl = getBaseUrl();

export default defineConfig({
  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    setupNodeEvents(on, config) {
      on('task', {});
    },
  },
  env: {
    baseUrl,
    testEmail: process.env.TEST_USER,
    password: process.env.TEST_PW,
  },
});
