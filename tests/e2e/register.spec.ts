import * as allure from 'allure-js-commons';
import { test } from '../../resources/support/base';
import { buildUser } from '../../resources/support/utils';

// The only test that creates a user in the database (the API cannot delete users).
// It is independent: it generates its own unique email and does not reuse data from other tests.
test.describe('Registration', () => {
  test.beforeEach(async ({ registerPage }) => {
    await allure.epic('Seu Barriga');
    await allure.feature('Registration');
    await registerPage.navigate();
  });

  test('Test Case 001: Register a user and log in', async ({ loginPage, registerPage, data }) => {
    const user = buildUser(data.ValidUser, 'register');

    await registerPage.createAccount(user);
    await loginPage.navigate();
    await loginPage.login(user.Email, user.Password);
    await loginPage.shouldSeeMessage('success', `Bem vindo, ${user.Name}!`);
  });
});
