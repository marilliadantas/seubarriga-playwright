// Fixtures base: Open Website / Close Website (hooks de Setup e Teardown)
const base = require('@playwright/test');
const { LoginPage } = require('../page_objects/login.page');
const { loadData } = require('./utils');

exports.test = base.test.extend({
  data: async ({}, use) => use(loadData()),

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate(); // Open Website
    await use(loginPage);
  },
});

// Close Website: screenshot de evidência ao final de cada teste
exports.test.afterEach(async ({ page }, testInfo) => {
  const file = testInfo.outputPath('evidence.png');
  await page.screenshot({ path: file, fullPage: true });
  await testInfo.attach('evidence', { path: file, contentType: 'image/png' });
});

exports.expect = base.expect;
