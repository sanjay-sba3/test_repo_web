import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC18', async ({ page }) => {
  // Open the page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter valid email and wrong password
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC18.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC18.password);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: An error message is displayed and user remains on login page
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
});
