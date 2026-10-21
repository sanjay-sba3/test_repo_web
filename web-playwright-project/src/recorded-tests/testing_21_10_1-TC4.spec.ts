import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC4', async ({ page }) => {
  // Open the home page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter a non-registered email in the 'Email Address' field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC4.email);

  // Enter a valid password in the 'Password' field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC4.password);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: An error message is displayed
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
});
