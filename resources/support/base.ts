// Fixtures base: Open Website / Close Website (hooks de Setup e Teardown)
import { test as baseTest, expect } from '@playwright/test';
import { LoginPage } from '../page_objects/login.page';
import { RegisterPage } from '../page_objects/register.page';
import { loadData, type TestData } from './utils';

export const test = baseTest.extend<{ data: TestData; loginPage: LoginPage; registerPage: RegisterPage }>({
  // eslint-disable-next-line no-empty-pattern
  data: async ({}, use) => {
    await use(loadData());
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(); // Open Website
    await use(loginPage);
  },

  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate(); // Open Website
    await use(registerPage);
  },
});

// Close Website: screenshot de evidência ao final de cada teste
test.afterEach(async ({ page }, testInfo) => {
  const file = testInfo.outputPath('evidence.png');
  await page.screenshot({ path: file, fullPage: true });
  await testInfo.attach('evidence', { path: file, contentType: 'image/png' });
});

export { expect };
