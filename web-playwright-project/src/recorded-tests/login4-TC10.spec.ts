import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('login4.recorded');

test('TC10: Login attempt with correct email and incorrect password', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC10.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC10.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expect a general authentication error message
  await expect(page.getByText('Invalid email or password')).toBeVisible();
  await expect(page).toHaveURL(/login/);
});
