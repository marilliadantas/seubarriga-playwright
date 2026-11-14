import type { Config } from 'jest';

// Jest cobre testes unitários (tests/unit) e de API (tests/api).
// Os testes de UI (*.spec.ts) rodam no Playwright.
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/unit/**/*.test.ts', '<rootDir>/tests/api/**/*.test.ts'],
  testTimeout: 15000,
};

export default config;
