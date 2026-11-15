import { expect, type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { registerLocators } from '../locators/register.locators';
import type { UserData } from '../support/utils';

export class RegisterPage {
  readonly el: ReturnType<typeof registerLocators>;

  constructor(readonly page: Page) {
    this.el = registerLocators(page);
  }

  async navigate() {
    await allure.step("Given I'm on the register page", () => this.page.goto('/cadastro'));
  }

  async register(name: string, email: string, password: string) {
    await allure.step('When I fill in the register form', async () => {
      await this.el.nameInput.fill(name);
      await this.el.emailInput.fill(email);
      await this.el.passwordInput.fill(password);
      await this.el.registerButton.click();
    });
  }

  async shouldRegisterSuccessfully(text: string) {
    await allure.step('Then the user should be registered', () => expect(this.el.successMessage).toContainText(text));
  }

  // Full flow: creates the user and validates success (the page is already opened by the spec hook)
  async createAccount(user: UserData) {
    await this.register(user.Name, user.Email, user.Password);
    // Expected text is the Portuguese message shown by the application
    await this.shouldRegisterSuccessfully('Usuário inserido com sucesso');
  }
}
