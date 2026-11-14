import { apiUrl } from '../../resources/support/env';
import { loadData } from '../../resources/support/utils';

// Testes de API do Seu Barriga (POST /signin), executados com Jest.
const signin = (email: string, senha: string) =>
  fetch(`${apiUrl}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

describe('POST /signin', () => {
  const data = loadData();

  it('autentica usuário existente e retorna token', async () => {
    const response = await signin(data.ExistingUser.Email, data.ExistingUser.Password);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual(
      expect.objectContaining({ id: expect.any(Number), nome: data.ExistingUser.Name, token: expect.any(String) }),
    );
  });

  it('rejeita credenciais inválidas com 400/401', async () => {
    const response = await signin(data.InvalidUser.Email, data.InvalidUser.Password);

    expect([400, 401]).toContain(response.status);
  });

  it('rejeita requisição sem senha', async () => {
    const response = await fetch(`${apiUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: data.ExistingUser.Email }),
    });

    expect(response.status).toBeGreaterThanOrEqual(400);
  });
});
