/**
 * @see: https://playwright.dev/docs/auth#reuse-signed-in-state
 * Re-use signed in state
 */

import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('/');

  // login logic goes hereå

  // end
  browser.close();
}

export default globalSetup;
