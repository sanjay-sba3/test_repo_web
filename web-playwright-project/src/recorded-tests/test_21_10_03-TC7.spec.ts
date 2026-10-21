import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC4', async ({ page }) => {
  // Test Step: Open the home page (https://www.mocktestzone.in/)
  await page.goto(data.baseURL);

  // Test Step: Click the "Login" link
  await page.getByRole('link', { name: 'Login' }).click();

  // Test Step: Click the "Sign In with Email" button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The user remains on the login page. The "Email Address" and "Password" fields show validation errors indicating they are required.
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
  await expect(page.getByText(/email is required/i)).toBeVisible();
  await expect(page.getByText(/password is required/i)).toBeVisible();
});
