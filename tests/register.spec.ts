import * as allure from 'allure-js-commons';
import { test } from '../resources/support/base';
import { buildUser } from '../resources/support/utils';

// Único teste que cria usuário no banco (a API não permite apagar usuários).
// É independente: gera o próprio e-mail único e não reaproveita dados de outros testes.
test.describe('Cadastro', () => {
  test.beforeEach(async () => {
    await allure.epic('Seu Barriga');
    await allure.feature('Cadastro');
  });

  test('Test Case 001: Cadastrar usuário e fazer login', async ({ loginPage, registerPage, data }) => {
    const user = buildUser(data.ValidUser, 'register');

    await registerPage.createAccount(user);
    await loginPage.navigate();
    await loginPage.login(user.Email, user.Password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${user.Name}!`);
  });
});
