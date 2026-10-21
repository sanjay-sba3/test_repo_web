import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC4', async ({ page }) => {
  // Test Step: Open the home page "https://www.mocktestzone.in/"
  await page.goto(data.baseURL);

  // Test Step: Click the "Login" link
  await page.getByRole('link', { name: 'Login' }).click();

  // Test Step: Enter "{{negative.email}}" in the "Email Address" field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC14.email);

  // Test Step: Click the "Sign In with Email" button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The form submission is prevented. The "Email Address" field is marked as invalid, and a relevant validation error message is shown.
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
  // This checks for a common HTML5 validation message for invalid email formats.
  await expect(page.getByText(/please include an '@'|invalid email/i)).toBeVisible();
});
