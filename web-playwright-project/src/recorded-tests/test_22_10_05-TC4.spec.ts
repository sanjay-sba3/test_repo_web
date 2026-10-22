import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_05.recorded');

test('TC4', async ({ page }) => {
  const testData = data.T4;

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();

  const emailField = page.getByRole('textbox', { name: 'Email' });
  await expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await expect(await passwordField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
