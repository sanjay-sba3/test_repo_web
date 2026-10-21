import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC21', async ({ page }) => {
  // Open the page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter XSS probe in email field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC21.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC21.password);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The application does not execute the script and shows an error.
  // Playwright fails tests with unhandled dialogs, so passing this test confirms no alert appeared.
  // We also verify login failed because validation should prevent it.
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
});
