import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC20', async ({ page }) => {
  // Open the page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter password
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC20.password);

  // Click the 'Sign In with Email' button with empty email
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The form submission is blocked by browser validation
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
  await expect(page).toHaveURL(/.*\/login/);
});
