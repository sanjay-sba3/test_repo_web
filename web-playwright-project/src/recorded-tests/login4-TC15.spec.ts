import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('login4.recorded');

test('TC15: Login attempt with empty password field', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC15.username);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expect submission to be blocked by browser validation for the required password field
  await expect(page).toHaveURL(/login/);
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
});
