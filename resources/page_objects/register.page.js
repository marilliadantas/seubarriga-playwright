const registerLocators = require('../locators/register.locators');
const { step, validateAndFill, validateAndClick, validateText } = require('../support/actions');

class RegisterPage {
  constructor(page) {
    this.page = page;
    this.el = registerLocators(page);
  }

  async navigate() {
    await step("Given I'm on the register page", () => this.page.goto('/cadastro'));
  }

  async register(name, email, password) {
    await step('When I fill in the register form', async () => {
      await validateAndFill(this.el.nameInput, name);
      await validateAndFill(this.el.emailInput, email);
      await validateAndFill(this.el.passwordInput, password);
      await validateAndClick(this.el.registerButton);
    });
  }

  async shouldRegisterSuccessfully(text) {
    await step('Then the user should be registered', () => validateText(this.el.successMessage, text));
  }
}

module.exports = { RegisterPage };
