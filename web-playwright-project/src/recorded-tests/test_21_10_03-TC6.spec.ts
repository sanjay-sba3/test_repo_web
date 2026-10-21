import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC3', async ({ page }) => {
  // Test Step: Open the home page (https://www.mocktestzone.in/)
  await page.goto(data.baseURL);

  // Test Step: Click the "Login" link
  await page.getByRole('link', { name: 'Login' }).click();

  // Test Step: Enter "{{random.email}}" in the "Email Address" field
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC6.email);

  // Test Step: Enter "anypassword" in the "Password" field
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC6.password);

  // Test Step: Click the "Sign In with Email" button
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expected: The user remains on the login page and an error message indicating the user was not found or credentials are invalid is displayed.
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
  await expect(page.getByText(/user not found|invalid credentials/i)).toBeVisible();
});
