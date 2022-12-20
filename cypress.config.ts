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
    setupNodeEvents(on, config) {
      on('task', {});
    },
  },
  env: {
    baseUrl,

  }
});
