import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('login4.recorded');

test('TC6: Login attempt with empty credentials', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  // Expect form submission to be blocked by browser validation
  await expect(page).toHaveURL(/login/);
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
});
