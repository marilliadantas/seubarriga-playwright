// Keywords de interação com a aplicação (equivalente ao actions.resource)
import { expect, type Locator } from '@playwright/test';
import * as allure from 'allure-js-commons';

export const step = <T>(name: string, body: () => Promise<T>): Promise<T> => Promise.resolve(allure.step(name, body));

export const validateAndFill = (locator: Locator, value: string) =>
  step(`Preencher campo com "${value}"`, async () => {
    await expect(locator).toBeVisible();
    await locator.fill(value);
  });

export const validateAndClick = (locator: Locator) =>
  step('Clicar no elemento', async () => {
    await expect(locator).toBeVisible();
    await locator.click();
  });

export const validateText = (locator: Locator, text: string) =>
  step(`Validar texto "${text}"`, async () => {
    await expect(locator).toContainText(text);
  });
