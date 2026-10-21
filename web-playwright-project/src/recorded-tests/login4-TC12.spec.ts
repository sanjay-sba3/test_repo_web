import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('login4.recorded');

test('TC12: Successful login with valid credentials', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.TC12.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC12.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expect redirection to a post-login area
  await expect(page).toHaveURL(/.*dashboard/);
});
