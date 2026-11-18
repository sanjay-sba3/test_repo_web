import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('record_18_11_01.recorded');

test('TC1', async ({ page }) => {
  // Open the home page at /
  await page.goto(new URL('/', config.baseUrl).toString());

  // Click the "Login" link.
  await page.getByRole('link', { name: 'Login' }).click();

  // Verify the URL contains "/login".
  await expect(page).toHaveURL(/\/login/);

  // Enter a valid user's email in the "Email" field.
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC1.username);

  // Enter a valid user's password in the "Password" field.
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);

  // Click the "Sign in" button.
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Verify the URL contains "/otp".
  await expect(page).toHaveURL(/\/otp/);

  // Enter the OTP
  const otpDigits = data.TC1.otp.split('');
  await page.getByRole('textbox', { name: 'Digit 1' }).fill(otpDigits[0]);
  await page.getByRole('textbox', { name: 'Digit 2' }).fill(otpDigits[1]);
  await page.getByRole('textbox', { name: 'Digit 3' }).fill(otpDigits[2]);
  await page.getByRole('textbox', { name: 'Digit 4' }).fill(otpDigits[3]);
  await page.getByRole('textbox', { name: 'Digit 5' }).fill(otpDigits[4]);
  await page.getByRole('textbox', { name: 'Digit 6' }).fill(otpDigits[5]);

  // Click the "Submit" button.
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verify the URL contains "/dashboard".
  await expect(page).toHaveURL(/\/dashboard/);

  // Click the "View profile →" link.
  await page.getByRole('link', { name: 'View profile →' }).click();

  // Verify the URL contains "/profile".
  await expect(page).toHaveURL(/\/profile/);

  // Click the "← Back to dashboard" link.
  await page.getByRole('link', { name: '← Back to dashboard' }).click();

  // Verify the URL contains "/dashboard".
  await expect(page).toHaveURL(/\/dashboard/);

  // Click the "Logout" button.
  await page.getByRole('button', { name: 'Logout' }).click();

  // The user is successfully logged out. The protected dashboard page is no longer accessible, and a logged-out element such as the 'Login' link is visible.
  await expect(page).not.toHaveURL(/\/dashboard/);
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
