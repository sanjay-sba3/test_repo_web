import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';

const data = loadTestData('test_22_10_01.recorded');

test('TC3', async ({ page }) => {
  const randomEmail = generateValue('email');

  // Open the home page at /
  await page.goto('http://localhost:3000/');

  // Click the "Login" link.
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Enter "{{random.email}}" in the "Email" field.
  await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);

  // Enter "any-password" in the "Password" field.
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC3.password);

  // Click the "Sign in" button.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Verify an authentication error message is visible.
  await expect(page).toHaveURL('http://localhost:3000/login');
  await expect(page.getByRole('alert')).toBeVisible();
});
