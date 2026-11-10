
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page.js';

test.describe('Autenticação', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.navigate();
  });

  test('Deve apresentar a página de login', async ({ page }) => {
    await expect(page).toHaveURL(/login/);
  });
});
