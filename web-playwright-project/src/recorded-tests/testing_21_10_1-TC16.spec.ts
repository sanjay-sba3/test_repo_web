import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC16', async ({ page }) => {
  // Open the page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter invalid email format
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC16.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC16.password);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The form is not submitted due to validation
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
  await expect(page).toHaveURL(/.*\/login/);
});
