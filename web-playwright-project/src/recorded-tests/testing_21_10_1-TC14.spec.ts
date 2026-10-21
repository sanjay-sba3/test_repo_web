import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC14', async ({ page }) => {
  // Open the page
  await page.goto('https://www.mocktestzone.in/');

  // Click the 'Login' link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter non-existent email and valid password
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC14.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC14.password);

  // Click the 'Sign In with Email' button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: An error message is displayed
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Account menu' })).not.toBeVisible();
});
