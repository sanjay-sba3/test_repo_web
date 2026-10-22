import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_01.recorded');

test('TC2', async ({ page }) => {
  // Open the home page at /
  await page.goto('http://localhost:3000/');

  // Click the "Login" link.
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Enter "${APP_USERNAME}" in the "Email" field.
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC2.username);

  // Enter "invalid-password-123" in the "Password" field.
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC2.password);

  // Click the "Sign in" button.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Verify an authentication error message is visible.
  await expect(page).toHaveURL('http://localhost:3000/login');
  await expect(page.getByRole('alert')).toBeVisible();
});
