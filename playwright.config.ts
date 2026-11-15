import { defineConfig, devices } from '@playwright/test';
import { apiUrl, baseUrl } from './resources/support/env';

export default defineConfig({
  testDir: './tests',
  outputDir: './evidence/test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', { resultsDir: 'allure-results', detail: true }],
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },
  projects: [
    {
      // UI tests in the browser
      name: 'e2e',
      testMatch: 'e2e/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'], baseURL: baseUrl },
    },
    {
      // API tests, no browser
      name: 'api',
      testMatch: 'api/**/*.spec.ts',
      use: { baseURL: apiUrl },
    },
    {
      // Unit tests for the helpers, no browser
      name: 'unit',
      testMatch: 'unit/**/*.spec.ts',
    },
  ],
});
