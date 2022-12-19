import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});
test('page should have proper meta data', async ({ page }) => {
  // await page.goto('/');
  await expect(page).toHaveTitle('T3 Boiler | ✨');
});

test('landing page should display heading and subtitle', async ({ page }) => {
  // await page.goto('/');
  await expect(page.locator('h1')).toContainText('Create T3 App');
  await expect(page.getByText('Hello from tRPC')).toBeDefined();
});

test("google oauth shouldn't work in headless mode", async ({ page }) => {
  const navigationPromise = page.waitForNavigation({
    waitUntil: 'domcontentloaded',
  });
  // await page.goto('/');
  const signInBtn = await page.getByRole('button', { name: /sign in/i });
  await signInBtn.click();
  await navigationPromise;
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeDefined();
  // const emailField = await page.getByRole('textbox', {
  //   name: 'Email or Phone',
  // });
  // await emailField.fill('gaurang.r.shah@gmail.com');

  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', 'youremail');
  // await page.click('#identifierNext');
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(
    page.getByRole('heading', { name: 'Couldn’t sign you in' })
  ).toBeDefined();
});
