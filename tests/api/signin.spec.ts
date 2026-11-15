import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { signin } from '../../resources/support/api';
import { loadData } from '../../resources/support/utils';

// Seu Barriga API tests (POST /signin).
test.describe('POST /signin', () => {
  const { ExistingUser, InvalidUser } = loadData();

  test.beforeEach(async () => {
    await allure.epic('Seu Barriga');
    await allure.feature('API');
  });

  test('authenticates an existing user and returns a token', async ({ request }) => {
    const response = await signin(request, { email: ExistingUser.Email, senha: ExistingUser.Password });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({ id: expect.any(Number), nome: ExistingUser.Name, token: expect.any(String) }),
    );
  });

  const rejectedScenarios = [
    { scenario: 'invalid credentials', credentials: { email: InvalidUser.Email, senha: InvalidUser.Password } },
    { scenario: 'wrong password', credentials: { email: ExistingUser.Email, senha: InvalidUser.Password } },
    { scenario: 'missing password', credentials: { email: ExistingUser.Email } },
    { scenario: 'missing email', credentials: { senha: ExistingUser.Password } },
    { scenario: 'empty body', credentials: {} },
  ];

  for (const { scenario, credentials } of rejectedScenarios) {
    test(`rejects login: ${scenario}`, async ({ request }) => {
      const response = await signin(request, credentials);

      expect(response.status()).toBeGreaterThanOrEqual(400);
      expect(await response.text()).not.toContain('token');
    });
  }
});
