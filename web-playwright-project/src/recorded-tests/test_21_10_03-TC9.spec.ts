import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC1', async ({ page }) => {
  // Test Step: Open the home page at 'https://www.mocktestzone.in/'.
  await page.goto(data.baseURL);

  // Test Step: Click the 'Login' link.
  await page.getByRole('link', { name: 'Login' }).click();

  // Test Step: Enter the test user's email in the 'Email Address' field.
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC9.username);

  // Test Step: Enter the test user's password in the 'Password' field.
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC9.password);

  // Test Step: Click the 'Sign In with Email' button.
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Test Step: Verify the 'Account menu' button is visible.
  await expect(page.getByRole('button', { name: 'Account menu' })).toBeVisible();

  // Test Step: Click the 'Account menu' button.
  await page.getByRole('button', { name: 'Account menu' }).click();

  // Test Step: Click the 'Logout' menu item.
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  // Test Step: Verify the 'Login' link is visible on the page.
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
  await expect(page).toHaveURL(data.baseURL);
});
