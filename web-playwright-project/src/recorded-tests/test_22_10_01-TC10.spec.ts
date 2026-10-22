import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_01.recorded');

test('TC2', async ({ page }) => {
  // Open the home page (http://localhost:3000/).
  await page.goto('http://localhost:3000/');

  // Click the "Login" link.
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Enter "${APP_PASSWORD}" in the "Password" field.
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC2.password);

  // Click the "Sign in" button.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Verify the user remains on the login page.
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Verify the "Email" field is marked as invalid.
  const emailField = page.getByRole('textbox', { name: 'Email' });
  expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
