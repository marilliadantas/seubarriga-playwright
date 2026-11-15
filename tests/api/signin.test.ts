import * as allure from 'allure-js-commons';
import { signin } from '../../resources/support/api';
import { loadData } from '../../resources/support/utils';

// Testes de API do Seu Barriga (POST /signin), executados com Jest.
describe('POST /signin', () => {
  const { ExistingUser, InvalidUser } = loadData();

  beforeEach(async () => {
    await allure.epic('Seu Barriga');
    await allure.feature('API');
  });

  it('autentica usuário existente e retorna token', async () => {
    const response = await signin({ email: ExistingUser.Email, senha: ExistingUser.Password });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({ id: expect.any(Number), nome: ExistingUser.Name, token: expect.any(String) }),
    );
  });

  it.each([
    ['credenciais inválidas', { email: InvalidUser.Email, senha: InvalidUser.Password }],
    ['senha incorreta', { email: ExistingUser.Email, senha: InvalidUser.Password }],
    ['sem senha', { email: ExistingUser.Email }],
    ['sem e-mail', { senha: ExistingUser.Password }],
    ['corpo vazio', {}],
  ])('rejeita login: %s', async (_cenario, credentials) => {
    const response = await signin(credentials);

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(await response.text()).not.toContain('token');
  });
});
