import { expect, type Page } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { loginLocators } from '../locators/login.locators';

export type MessageType = 'error' | 'success';

export class LoginPage {
  readonly el: ReturnType<typeof loginLocators>;

  constructor(readonly page: Page) {
    this.el = loginLocators(page);
  }

  async navigate() {
    await allure.step("Given I'm on the login page", () => this.page.goto('/login'));
  }

  async login(email: string, password: string) {
    await allure.step('When I fill in the login form', async () => {
      await this.el.emailInput.fill(email);
      await this.el.passwordInput.fill(password);
      await this.el.loginButton.click();
    });
  }

  async shouldSeeMessage(type: MessageType, text: string) {
    let message = this.el.successMessage;

    if (type === 'error') {
      message = this.el.errorMessage;
    }

    await allure.step(`Then I should see the ${type} message "${text}"`, () => expect(message).toContainText(text));
  }
}
