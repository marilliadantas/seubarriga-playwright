// Elementos da tela de login
module.exports = (page) => ({
  emailInput: page.locator('input[id="email"]'),
  passwordInput: page.locator('input[id="senha"]'),
  loginButton: page.locator('button[type="submit"]'),
  errorMessage: page.locator('.alert-danger'),
  successMessage: page.locator('.alert-success'),
});
