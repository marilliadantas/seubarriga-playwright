import type { Config } from 'jest';

// Jest covers unit tests (tests/unit) and API tests (tests/api).
// UI tests (*.spec.ts) run on Playwright.
// The allure-jest environment writes results to the same allure-results folder used by Playwright.
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'allure-jest/node',
  testEnvironmentOptions: { resultsDir: 'allure-results' },
  testMatch: ['<rootDir>/tests/unit/**/*.test.ts', '<rootDir>/tests/api/**/*.test.ts'],
  testTimeout: 15000,
};

export default config;
