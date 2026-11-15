// Fixtures base: criam page objects e dados. Cada spec abre sua página inicial em um beforeEach.
// Close Website: o afterEach abaixo anexa a evidência.
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
    await use(new LoginPage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
});

// Close Website: screenshot de evidência ao final de cada teste
test.afterEach(async ({ page }, testInfo) => {
  const file = testInfo.outputPath('evidence.png');
  await page.screenshot({ path: file, fullPage: true });
  await testInfo.attach('evidence', { path: file, contentType: 'image/png' });
});

export { expect };
