import type { Page } from '@playwright/test';
import { registerLocators } from '../locators/register.locators';
import { step, validateAndFill, validateAndClick, validateText } from '../support/actions';
import type { UserData } from '../support/utils';

export class RegisterPage {
  readonly el: ReturnType<typeof registerLocators>;

  constructor(readonly page: Page) {
    this.el = registerLocators(page);
  }

  async navigate() {
    await step("Given I'm on the register page", () => this.page.goto('/cadastro'));
  }

  async register(name: string, email: string, password: string) {
    await step('When I fill in the register form', async () => {
      await validateAndFill(this.el.nameInput, name);
      await validateAndFill(this.el.emailInput, email);
      await validateAndFill(this.el.passwordInput, password);
      await validateAndClick(this.el.registerButton);
    });
  }

  async shouldRegisterSuccessfully(text: string) {
    await step('Then the user should be registered', () => validateText(this.el.successMessage, text));
  }

  // Fluxo completo: abre o cadastro, cria o usuário e valida o sucesso
  async createAccount(user: UserData) {
    await this.navigate();
    await this.register(user.Name, user.Email, user.Password);
    await this.shouldRegisterSuccessfully('Usuário inserido com sucesso');
  }
}
