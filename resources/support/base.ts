// Base fixtures: create page objects and data. Each spec opens its own start page in a beforeEach.
// Close Website: the afterEach below attaches the evidence screenshot.
import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/login.page';
import { RegisterPage } from '../page_objects/register.page';
import { loadData, type TestData } from './utils';

export const test = baseTest.extend<{ data: TestData; loginPage: LoginPage; registerPage: RegisterPage }>({
  data: async ({}, use) => {
    await use(loadData());
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

// Close Website: full-page screenshot attached to the report after every test
test.afterEach(async ({ page }, testInfo) => {
  const file = testInfo.outputPath('evidence.png');
  await page.screenshot({ path: file, fullPage: true });
  await testInfo.attach('evidence', { path: file, contentType: 'image/png' });
});

export { expect };
