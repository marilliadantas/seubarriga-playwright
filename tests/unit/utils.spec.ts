import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { buildUser, getExistingUser, loadData, uniqueEmail } from '../../resources/support/utils';
import { requireEnv, resolveEnv, type EnvName } from '../../resources/support/env';

test.beforeEach(async () => {
  await allure.epic('Seu Barriga');
  await allure.feature('Unit');
});

test.describe('uniqueEmail', () => {
  test('uses the given prefix and the example.com domain', () => {
    expect(uniqueEmail('login')).toMatch(/^login\.\d+@example\.com$/);
  });

  test('uses "qa" as the default prefix', () => {
    expect(uniqueEmail()).toMatch(/^qa\.\d+@example\.com$/);
  });

  test('generates different emails when called at different moments', () => {
    const realNow = Date.now;

    try {
      Date.now = () => 1000;
      const first = uniqueEmail();
      Date.now = () => 2000;
      const second = uniqueEmail();

      expect(first).not.toBe(second);
    } finally {
      Date.now = realNow;
    }
  });
});

test.describe('buildUser', () => {
  test('keeps the template data and generates a unique email', () => {
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

test.describe('loadData', () => {
  const environments: EnvName[] = ['Stg', 'Prd'];

  for (const env of environments) {
    test(`returns the full test data for the ${env} environment`, () => {
      const data = loadData(env);

      expect(data.ValidUser).toEqual(expect.objectContaining({ Name: expect.any(String), Email: expect.any(String) }));
      expect(data.ExistingUser).toEqual(getExistingUser());
      expect(data.InvalidUser).toHaveProperty('Password');
    });
  }
});

test.describe('resolveEnv', () => {
  test('uses Stg by default', () => {
    expect(resolveEnv().ENV).toBe('Stg');
  });

  test('returns the UI and API URLs of the environment', () => {
    const env = resolveEnv('Prd');

    expect(env.baseUrl).toMatch(/^https:\/\//);
    expect(env.apiUrl).toMatch(/^https:\/\//);
  });

  test('rejects an invalid environment', () => {
    expect(() => resolveEnv('Dev')).toThrow(/Invalid ENV/);
  });
});

test.describe('requireEnv', () => {
  test.afterEach(() => {
    delete process.env.TEST_VARIABLE;
  });

  test('returns the value of a defined variable', () => {
    process.env.TEST_VARIABLE = 'abc';

    expect(requireEnv('TEST_VARIABLE')).toBe('abc');
  });

  test('fails with a clear message when the variable is missing', () => {
    expect(() => requireEnv('TEST_VARIABLE')).toThrow(/TEST_VARIABLE is not set/);
  });
});
