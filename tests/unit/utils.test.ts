import { buildUser, getExistingUser, loadData, uniqueEmail } from '../../resources/support/utils';
import { requireEnv, resolveEnv } from '../../resources/support/env';
import * as allure from 'allure-js-commons';

beforeEach(async () => {
  await allure.epic('Seu Barriga');
  await allure.feature('Unit');
});

describe('utils', () => {
  describe('uniqueEmail', () => {
    it('usa o prefixo informado e o domínio example.com', () => {
      expect(uniqueEmail('login')).toMatch(/^login\.\d+@example\.com$/);
    });

    it('usa "qa" como prefixo padrão', () => {
      expect(uniqueEmail()).toMatch(/^qa\.\d+@example\.com$/);
    });

    it('gera e-mails diferentes em chamadas em instantes diferentes', () => {
      jest.useFakeTimers();
      jest.setSystemTime(1000);
      const first = uniqueEmail();
      jest.setSystemTime(2000);
      const second = uniqueEmail();
      jest.useRealTimers();
      expect(first).not.toBe(second);
    });
  });

  describe('buildUser', () => {
    it('mantém os dados do modelo e gera e-mail único', () => {
      const template = { Name: 'Teste QA', Email: 'fixo@example.com', Password: 'Senha@123' };
      const user = buildUser(template, 'login');

      expect(user).toEqual({ Name: 'Teste QA', Email: expect.stringMatching(/^login\.\d+@example\.com$/), Password: 'Senha@123' });
      expect(template.Email).toBe('fixo@example.com');
    });
  });

  describe('loadData', () => {
    it.each(['Stg', 'Prd'] as const)('retorna a massa completa do ambiente %s', (env) => {
      const data = loadData(env);
      expect(data.ValidUser).toEqual(expect.objectContaining({ Name: expect.any(String), Email: expect.any(String) }));
      expect(data.ExistingUser).toEqual(getExistingUser());
      expect(data.InvalidUser).toHaveProperty('Password');
    });
  });
});

describe('resolveEnv', () => {
  it('usa Stg por padrão', () => {
    expect(resolveEnv().ENV).toBe('Stg');
  });

  it('retorna as URLs de UI e de API do ambiente', () => {
    const env = resolveEnv('Prd');
    expect(env.baseUrl).toMatch(/^https:\/\//);
    expect(env.apiUrl).toMatch(/^https:\/\//);
  });

  it('rejeita ambiente inválido', () => {
    expect(() => resolveEnv('Dev')).toThrow(/ENV inválido/);
  });
});

describe('requireEnv', () => {
  afterEach(() => {
    delete process.env.VARIAVEL_DE_TESTE;
  });

  it('retorna o valor da variável definida', () => {
    process.env.VARIAVEL_DE_TESTE = 'abc';
    expect(requireEnv('VARIAVEL_DE_TESTE')).toBe('abc');
  });

  it('falha com mensagem clara quando a variável não existe', () => {
    expect(() => requireEnv('VARIAVEL_DE_TESTE')).toThrow(/VARIAVEL_DE_TESTE não definida/);
  });
});
