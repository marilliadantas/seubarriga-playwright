import * as allure from 'allure-js-commons';
import { signin } from '../../resources/support/api';
import { loadData } from '../../resources/support/utils';

// Seu Barriga API tests (POST /signin), run with Jest.
describe('POST /signin', () => {
  const { ExistingUser, InvalidUser } = loadData();

  beforeEach(async () => {
    await allure.epic('Seu Barriga');
    await allure.feature('API');
  });

  it('authenticates an existing user and returns a token', async () => {
    const response = await signin({ email: ExistingUser.Email, senha: ExistingUser.Password });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({ id: expect.any(Number), nome: ExistingUser.Name, token: expect.any(String) }),
    );
  });

  it.each([
    ['invalid credentials', { email: InvalidUser.Email, senha: InvalidUser.Password }],
    ['wrong password', { email: ExistingUser.Email, senha: InvalidUser.Password }],
    ['missing password', { email: ExistingUser.Email }],
    ['missing email', { senha: ExistingUser.Password }],
    ['empty body', {}],
  ])('rejects login: %s', async (_scenario, credentials) => {
    const response = await signin(credentials);

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(await response.text()).not.toContain('token');
  });
});
