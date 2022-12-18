import { expect,test } from '@playwright/test';

test('should navigate to the about page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Create T3 App');
  // await expect(page.locator('p')).toContainText('Loading tRPC query...');
  await page.getByRole('button', { name: /sign in/i });
  // await signInBtn.click();
});
