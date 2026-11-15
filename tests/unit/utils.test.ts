import * as allure from 'allure-js-commons';
import { buildUser, getExistingUser, loadData, uniqueEmail } from '../../resources/support/utils';
import { requireEnv, resolveEnv } from '../../resources/support/env';

beforeEach(async () => {
  await allure.epic('Seu Barriga');
  await allure.feature('Unit');
});

describe('utils', () => {
  describe('uniqueEmail', () => {
    it('uses the given prefix and the example.com domain', () => {
      expect(uniqueEmail('login')).toMatch(/^login\.\d+@example\.com$/);
    });

    it('uses "qa" as the default prefix', () => {
      expect(uniqueEmail()).toMatch(/^qa\.\d+@example\.com$/);
    });

    it('generates different emails when called at different moments', () => {
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
    it('keeps the template data and generates a unique email', () => {
      const template = { Name: 'QA Test', Email: 'fixed@example.com', Password: 'Password@123' };
      const user = buildUser(template, 'login');

      expect(user).toEqual({
        Name: 'QA Test',
        Email: expect.stringMatching(/^login\.\d+@example\.com$/),
        Password: 'Password@123',
      });
      expect(template.Email).toBe('fixed@example.com');
    });
  });

  describe('loadData', () => {
    it.each(['Stg', 'Prd'] as const)('returns the full test data for the %s environment', (env) => {
      const data = loadData(env);
      expect(data.ValidUser).toEqual(expect.objectContaining({ Name: expect.any(String), Email: expect.any(String) }));
      expect(data.ExistingUser).toEqual(getExistingUser());
      expect(data.InvalidUser).toHaveProperty('Password');
    });
  });
});

describe('resolveEnv', () => {
  it('uses Stg by default', () => {
    expect(resolveEnv().ENV).toBe('Stg');
  });

  it('returns the UI and API URLs of the environment', () => {
    const env = resolveEnv('Prd');
    expect(env.baseUrl).toMatch(/^https:\/\//);
    expect(env.apiUrl).toMatch(/^https:\/\//);
  });

  it('rejects an invalid environment', () => {
    expect(() => resolveEnv('Dev')).toThrow(/Invalid ENV/);
  });
});

describe('requireEnv', () => {
  afterEach(() => {
    delete process.env.TEST_VARIABLE;
  });

  it('returns the value of a defined variable', () => {
    process.env.TEST_VARIABLE = 'abc';
    expect(requireEnv('TEST_VARIABLE')).toBe('abc');
  });

  it('fails with a clear message when the variable is missing', () => {
    expect(() => requireEnv('TEST_VARIABLE')).toThrow(/TEST_VARIABLE is not set/);
  });
});
