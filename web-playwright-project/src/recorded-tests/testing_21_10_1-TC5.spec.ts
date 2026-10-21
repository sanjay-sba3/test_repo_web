import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC5', async ({ page }) => {
  // Open the home page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter an invalid email format in the 'Email Address' field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC5.email);

  // Enter a valid password in the 'Password' field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC5.password);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The user is not logged in due to validation
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
  await expect(page).toHaveURL(/.*\/login/);
});
