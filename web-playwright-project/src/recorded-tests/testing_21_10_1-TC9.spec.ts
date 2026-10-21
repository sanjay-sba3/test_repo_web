import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC9', async ({ page }) => {
  // Open the page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter a valid user's email in the 'Email Address' field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC9.email);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The browser blocks submission due to empty password
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
  await expect(page).toHaveURL(/.*\/login/);
});
