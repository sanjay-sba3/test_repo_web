import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('record_18_11_01.recorded');

test('TC11', async ({ page }) => {
  // Open the Login page (/login)
  await page.goto(new URL('/login', config.baseUrl).toString());

  // Click the "Sign in" button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // The browser blocks form submission and both the "Email" and "Password" fields are marked as invalid. The user remains on the /login page.
  const emailField = page.getByRole('textbox', { name: 'Email' });
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  expect(await passwordField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  await expect(page).toHaveURL(/\/login/);
});
