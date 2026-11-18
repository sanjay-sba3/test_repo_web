import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('record_18_11_01.recorded');

test('TC5', async ({ page }) => {
  // Open the Login page (/login)
  await page.goto(new URL('/login', config.baseUrl).toString());

  // Enter a valid user's email in the "Email" field
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC5.email);

  // Enter "wrongpassword123" in the "Password" field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC5.password);

  // Click the "Sign in" button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // An error message indicating invalid credentials is displayed, and the user remains on the login page.
  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByRole('alert')).toBeVisible();
});
