import type { Page } from '@playwright/test';
import { loginLocators } from '../locators/login.locators';
import { step, validateAndFill, validateAndClick, validateText } from '../support/actions';

export type MessageType = 'error' | 'success';

export class LoginPage {
  readonly el: ReturnType<typeof loginLocators>;

  constructor(readonly page: Page) {
    this.el = loginLocators(page);
  }

  async navigate() {
    await step("Given I'm on the login page", () => this.page.goto('/login'));
  }

  async login(email: string, password: string) {
    await step('When I fill in the login form', async () => {
      await validateAndFill(this.el.emailInput, email);
      await validateAndFill(this.el.passwordInput, password);
      await validateAndClick(this.el.loginButton);
    });
  }

  async shouldSeeMessage(type: MessageType, text: string) {
    const message = type === 'error' ? this.el.errorMessage : this.el.successMessage;
    await step(`Then I should see the ${type} message "${text}"`, () => validateText(message, text));
  }
}
