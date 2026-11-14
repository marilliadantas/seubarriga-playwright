import type { Page } from '@playwright/test';

// Elementos da tela de cadastro
export const registerLocators = (page: Page) => ({
  nameInput: page.locator('input[id="nome"]'),
  emailInput: page.locator('input[id="email"]'),
  passwordInput: page.locator('input[id="senha"]'),
  registerButton: page.locator('input[type="submit"][value="Cadastrar"]'),
  successMessage: page.locator('.alert-success'),
});
