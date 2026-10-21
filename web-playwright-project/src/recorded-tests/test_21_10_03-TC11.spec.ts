import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC1', async ({ page }) => {
  // Test Step: Open the home page "https://www.mocktestzone.in/"
  await page.goto(data.baseURL);

  // Test Step: Click the "Login" link
  await page.getByRole('link', { name: 'Login' }).click();

  // Test Step: Enter "${APP_USERNAME}" in the "Email Address" field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC11.username);

  // Test Step: Enter "${APP_PASSWORD}" in the "Password" field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC11.password);

  // Test Step: Click the "Sign In with Email" button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Test Step: Verify the "Account menu" button is visible
  await expect(page.getByRole('button', { name: 'Account menu' })).toBeVisible();

  // Test Step: Click the "Account menu" button
  await page.getByRole('button', { name: 'Account menu' }).click();

  // Test Step: Click the "Logout" menu item
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Expected: After logging out, the user is returned to a logged-out state and the "Login" link is visible again.
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page).toHaveURL(data.baseURL);
});
