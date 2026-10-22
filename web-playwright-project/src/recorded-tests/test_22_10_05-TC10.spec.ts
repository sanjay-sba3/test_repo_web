import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_05.recorded');

test('TC3', async ({ page }) => {
  const testData = data.T10;

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  const loginUrl = page.url();
  await page.getByRole('textbox', { name: 'Email' }).fill(testData.username);
  await page.getByRole('button', { name: 'Sign in' }).click();

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await expect(await passwordField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  await expect(page).toHaveURL(loginUrl);
});
