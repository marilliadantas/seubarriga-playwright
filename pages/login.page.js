export class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('input[id="email"]');
    this.passwordInput = page.locator('input[id="senha"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async navigate() {
    await this.page.goto('/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}