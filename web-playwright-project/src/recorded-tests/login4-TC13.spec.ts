import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('login4.recorded');

test('TC13: Login attempt with invalid password', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC13.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC13.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expect an error message for invalid credentials
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page).toHaveURL(/login/);
});
