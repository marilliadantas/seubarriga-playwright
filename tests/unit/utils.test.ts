import { loadData, uniqueEmail } from '../../resources/support/utils';
import { resolveEnv } from '../../resources/support/env';

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

  describe('loadData', () => {
    it.each(['Stg', 'Prd'] as const)('retorna a massa completa do ambiente %s', (env) => {
      const data = loadData(env);
      expect(data.ValidUser).toEqual(expect.objectContaining({ Name: expect.any(String), Email: expect.any(String) }));
      expect(data.ExistingUser.Email).toBe('teste@teste.com');
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
