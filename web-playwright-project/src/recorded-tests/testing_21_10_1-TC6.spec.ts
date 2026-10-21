import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('testing_21_10_1.recorded');

test('TC6', async ({ page }) => {
  // Navigate directly to the Profile page
  await page.goto('https://www.mocktestzone.in/profile');

  // Expected: The user is redirected to the Login page
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
});
