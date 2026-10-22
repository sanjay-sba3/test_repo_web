import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_05.recorded');

test('TC5', async ({ page }) => {
  const testData = data.T12;

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  const emailField = page.getByRole('textbox', { name: 'Email' });
  await emailField.fill(testData.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(testData.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Playwright fails on unhandled dialogs, so no explicit check for the alert is needed.
  await expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
