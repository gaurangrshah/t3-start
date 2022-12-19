import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
  },
});
