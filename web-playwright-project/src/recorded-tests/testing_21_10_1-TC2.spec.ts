import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC2', async ({ page }) => {
  // Open the home page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter a valid username in the 'Email Address' field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC2.email);

  // Enter a valid password in the 'Password' field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC2.password);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: Verify the 'Account menu' button is visible
  await expect(page.getByRole('button', { name: 'Account menu' })).toBeVisible();

  // Click the 'Account menu' button
  await page.getByRole('button', { name: 'Account menu' }).click();

  // Click the 'Logout' menu item
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Expected: User is logged out and returned to a non-authenticated page
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
});
