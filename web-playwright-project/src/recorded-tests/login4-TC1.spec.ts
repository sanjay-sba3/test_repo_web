import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('login4.recorded');

test('TC1: Login with script in Email Address field', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC1.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expect login to fail due to invalid email format, preventing script execution
  await expect(page).toHaveURL(/login/);
  // A simple assertion is that the sign-in button is still visible, indicating we haven't navigated away
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
});
