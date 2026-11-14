import * as allure from 'allure-js-commons';
import { test, expect } from '../resources/support/base';
import { buildUser } from '../resources/support/utils';

test.describe('Autenticação', () => {
  test.beforeEach(async () => {
    await allure.epic('Seu Barriga');
    await allure.feature('Autenticação');
  });

  test('Test Case 001: Deve apresentar a página de login @Smoke @Regression', async ({ page, loginPage }) => {
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.el.emailInput).toBeVisible();
    await expect(loginPage.el.passwordInput).toBeVisible();
  });

  test('Test Case 002: Login com credenciais inválidas @Regression', async ({ loginPage, data }) => {
    await loginPage.login(data.InvalidUser.Email, data.InvalidUser.Password);
    await loginPage.shouldSeeMessage('error', 'Problemas com o login do usuário');
  });

  test('Test Case 003: Login com sucesso @Smoke @Regression', async ({ loginPage, registerPage, data }) => {
    const user = buildUser(data.ValidUser, 'login');

    await registerPage.createAccount(user);
    await loginPage.navigate();
    await loginPage.login(user.Email, user.Password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${user.Name}!`);
  });

  test('Test Case 004: Login com sucesso com usuário existente @Smoke @Regression', async ({ loginPage, data }) => {
    await loginPage.login(data.ExistingUser.Email, data.ExistingUser.Password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${data.ExistingUser.Name}!`);
  });
});
