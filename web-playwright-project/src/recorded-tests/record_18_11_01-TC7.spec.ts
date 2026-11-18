import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('record_18_11_01.recorded');

test('TC7', async ({ page }) => {
  // Open the Login page (/login)
  await page.goto(new URL('/login', config.baseUrl).toString());

  // Enter "{{random.email}}" in the "Email" field
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC7.email);

  // Enter a valid password in the "Password" field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC7.password);

  // Click the "Sign in" button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // An error message indicating invalid credentials is displayed, and the user remains on the login page.
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('alert')).toBeVisible();
});
