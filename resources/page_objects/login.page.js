const loginLocators = require('../locators/login.locators');
const { step, validateAndFill, validateAndClick, validateText } = require('../support/actions');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.el = loginLocators(page);
  }

  async navigate() {
    await step("Given I'm on the login page", () => this.page.goto('/login'));
  }

  async login(email, password) {
    await step('When I fill in the login form', async () => {
      await validateAndFill(this.el.emailInput, email);
      await validateAndFill(this.el.passwordInput, password);
      await validateAndClick(this.el.loginButton);
    });
  }

  // type: 'error' | 'success'
  async shouldSeeMessage(type, text) {
    const message = type === 'error' ? this.el.errorMessage : this.el.successMessage;
    await step(`Then I should see the ${type} message "${text}"`, () => validateText(message, text));
  }
}

module.exports = { LoginPage };
