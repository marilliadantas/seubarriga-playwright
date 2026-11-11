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

  async shouldShowError(text) {
    await step('Then I should see an error message', () => validateText(this.el.errorMessage, text));
  }

  async shouldAuthenticate(text) {
    await step('Then I should be authenticated', () => validateText(this.el.successMessage, text));
  }
}

module.exports = { LoginPage };
