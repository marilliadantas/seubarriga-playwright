// Keywords de interação com a aplicação (equivalente ao actions.resource)
const { expect } = require('@playwright/test');
const allure = require('allure-js-commons');

const step = (name, body) => allure.step(name, body);

const validateAndFill = (locator, value) =>
  step(`Preencher campo com "${value}"`, async () => {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  });

const validateAndClick = (locator) =>
  step('Clicar no elemento', async () => {
    await expect(locator).toBeVisible();
    await locator.click();
  });

const validateText = (locator, text) =>
  step(`Validar texto "${text}"`, async () => {
    await expect(locator).toContainText(text);
  });

module.exports = { step, validateAndFill, validateAndClick, validateText };
