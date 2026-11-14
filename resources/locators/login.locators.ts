import type { Page } from '@playwright/test';

// Elementos da tela de login
export const loginLocators = (page: Page) => ({
  emailInput: page.locator('input[id="email"]'),
  passwordInput: page.locator('input[id="senha"]'),
  loginButton: page.locator('button[type="submit"]'),
  errorMessage: page.locator('.alert-danger'),
  successMessage: page.locator('.alert-success'),
});
