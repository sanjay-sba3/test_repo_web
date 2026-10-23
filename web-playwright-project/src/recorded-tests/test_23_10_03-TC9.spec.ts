import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_23_10_03.recorded');

test('TC5', async ({ page }) => {
  // Precondition: Log in
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(data.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/.*\/dashboard/);

  // Test steps
  await page.goto('/dashboard');
  await page.getByRole('link', { name: 'View profile →' }).click();
  await expect(page).toHaveURL(/.*\/profile/);
  await page.getByRole('link', { name: '← Back to dashboard' }).click();
  await expect(page).toHaveURL(/.*\/dashboard/);
  await expect(page.getByRole('link', { name: 'View profile →' })).toBeVisible();
});
