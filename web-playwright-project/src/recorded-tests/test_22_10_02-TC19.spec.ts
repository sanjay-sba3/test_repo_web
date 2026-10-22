import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_02.recorded');

test('TC19', async ({ page }) => {
  // Precondition: Log in and go to profile page
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC19.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC19.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.goto('http://localhost:3000/profile');
  await expect(page).toHaveURL(/.*\/profile/);

  // Test steps
  await page.getByRole('link', { name: '← Back to dashboard' }).click();
  await expect(page.getByRole('link', { name: 'View profile →' })).toBeVisible();
  await expect(page).toHaveURL(/.*\/dashboard/);
});
