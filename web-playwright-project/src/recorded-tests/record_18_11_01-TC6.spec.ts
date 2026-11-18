import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('record_18_11_01.recorded');

test('TC6', async ({ page }) => {
  // Open the Login page (/login)
  await page.goto(new URL('/login', config.baseUrl).toString());

  // Enter "{{negative.email}}" in the "Email" field
  const emailField = page.getByRole('textbox', { name: 'Email' });
  await emailField.fill(data.TC6.email);

  // Enter a valid password in the "Password" field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC6.password);

  // Click the "Sign in" button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // An error message related to the invalid email format is displayed, and the user remains on the login page.
  await expect(page).toHaveURL(/\/login/);
  expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
