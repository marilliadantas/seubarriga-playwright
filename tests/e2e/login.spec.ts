import * as allure from 'allure-js-commons';
import { test, expect } from '../../resources/support/base';

// Login tests only use the existing user: they do not create data in the database.
test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.epic('Seu Barriga');
    await allure.feature('Authentication');
    await loginPage.navigate();
  });

  test('Test Case 001: Should display the login page', async ({ page, loginPage }) => {
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.el.emailInput).toBeVisible();
    await expect(loginPage.el.passwordInput).toBeVisible();
  });

  test('Test Case 002: Login with invalid credentials', async ({ loginPage, data }) => {
    await loginPage.login(data.InvalidUser.Email, data.InvalidUser.Password);
    // The expected texts below are the Portuguese messages shown by the application
    await loginPage.shouldSeeMessage('error', 'Problemas com o login do usuário');
  });

  test('Test Case 003: Login successfully', async ({ loginPage, data }) => {
    await loginPage.login(data.ExistingUser.Email, data.ExistingUser.Password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${data.ExistingUser.Name}!`);
  });
});
