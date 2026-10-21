import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC1', async ({ page }) => {
  // Test Step: Open the home page at https://www.mocktestzone.in/
  await page.goto(data.baseURL);

  // Test Step: Click the "Login" link.
  await page.getByRole('link', { name: 'Login' }).click();

  // Test Step: Enter a valid password in the "Password" field.
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);

  // Test Step: Click the "Sign In with Email" button.
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The user is not logged in and remains on the login page.
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();

  // Expected: The 'Email Address' field is marked as invalid.
  // This checks for a common validation message pattern for required fields.
  await expect(page.getByText(/email is required/i)).toBeVisible();
});
