import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('record_18_11_01.recorded');

test('TC8', async ({ page }) => {
  // Open the home page
  await page.goto(new URL('/', config.baseUrl).toString());

  // Click the "Login" link
  await page.getByRole('link', { name: 'Login' }).click();

  // Enter username and password
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC8.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC8.password);

  // Click the "Sign in" button
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Verify the URL contains "/otp"
  await expect(page).toHaveURL(/\/otp/);

  // Enter incorrect OTP
  await page.getByRole('textbox', { name: 'Digit 1' }).fill('9');
  await page.getByRole('textbox', { name: 'Digit 2' }).fill('9');
  await page.getByRole('textbox', { name: 'Digit 3' }).fill('9');
  await page.getByRole('textbox', { name: 'Digit 4' }).fill('9');
  await page.getByRole('textbox', { name: 'Digit 5' }).fill('9');
  await page.getByRole('textbox', { name: 'Digit 6' }).fill('9');

  // Click the "Submit" button
  await page.getByRole('button', { name: 'Submit' }).click();

  // An error message indicating an incorrect OTP is displayed. The user remains on the OTP page.
  await expect(page).toHaveURL(/\/otp/);
  await expect(page.getByRole('alert')).toBeVisible();
});
