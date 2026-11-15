import * as allure from 'allure-js-commons';
import { test, expect } from '../resources/support/base';

// Os testes de login usam apenas o usuário existente: não criam dados no banco.
test.describe('Autenticação', () => {
  test.beforeEach(async ({ loginPage }) => {
    await allure.epic('Seu Barriga');
    await allure.feature('Autenticação');
    await loginPage.navigate();
  });

  test('Test Case 001: Deve apresentar a página de login', async ({ page, loginPage }) => {
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.el.emailInput).toBeVisible();
    await expect(loginPage.el.passwordInput).toBeVisible();
  });

  test('Test Case 002: Login com credenciais inválidas', async ({ loginPage, data }) => {
    await loginPage.login(data.InvalidUser.Email, data.InvalidUser.Password);
    await loginPage.shouldSeeMessage('error', 'Problemas com o login do usuário');
  });

  test('Test Case 003: Login com sucesso', async ({ loginPage, data }) => {
    await loginPage.login(data.ExistingUser.Email, data.ExistingUser.Password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${data.ExistingUser.Name}!`);
  });
});
