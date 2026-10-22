import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_02.recorded');

test('TC18', async ({ page }) => {
  // Precondition: Log in
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC18.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC18.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/.*\/dashboard/);

  // Test steps
  await page.getByRole('link', { name: 'View profile →' }).click();
  await expect(page.getByRole('link', { name: '← Back to dashboard' })).toBeVisible();
  await expect(page).toHaveURL(/.*\/profile/);
});
