import * as allure from 'allure-js-commons';
import { test, expect } from '../resources/support/base';
import { RegisterPage } from '../resources/page_objects/register.page';
import { uniqueEmail } from '../resources/support/utils';

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

  test('Test Case 003: Login com sucesso @Smoke @Regression', async ({ page, loginPage, data }) => {
    const user = { name: data.ValidUser.Name, email: uniqueEmail('login'), password: data.ValidUser.Password };

    // Pré-condição: cria um usuário novo
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
    await registerPage.register(user.name, user.email, user.password);
    await registerPage.shouldRegisterSuccessfully('Usuário inserido com sucesso');

    await loginPage.navigate();
    await loginPage.login(user.email, user.password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${user.name}!`);
  });

  test('Test Case 004: Login com sucesso com usuário existente @Smoke @Regression', async ({ loginPage, data }) => {
    await loginPage.login(data.ExistingUser.Email, data.ExistingUser.Password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${data.ExistingUser.Name}!`);
  });
});
