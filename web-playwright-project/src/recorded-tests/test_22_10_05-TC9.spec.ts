import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_05.recorded');

test('TC2', async ({ page }) => {
  const testData = data.T9;

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  const loginUrl = page.url();
  await page.getByRole('textbox', { name: 'Password' }).fill(testData.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  const emailField = page.getByRole('textbox', { name: 'Email' });
  await expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  await expect(page).toHaveURL(loginUrl);
});
