import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('login4.recorded');

test('TC16: Login attempt with invalid email format', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC16.invalidFormatEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC16.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expect submission to be blocked by browser validation for the invalid email format
  await expect(page).toHaveURL(/login/);
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
});
