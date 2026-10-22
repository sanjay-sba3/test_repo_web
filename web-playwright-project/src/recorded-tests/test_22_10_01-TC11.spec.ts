import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_01.recorded');

test('TC1', async ({ page }) => {
  // Precondition: Log in as the environment test user
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC1.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Open the Dashboard page.
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  // Click the 'View profile →' link.
  await page.getByRole('link', { name: 'View profile →' }).click();
  await expect(page).toHaveURL('http://localhost:3000/profile');

  // Click the '← Back to dashboard' link.
  await page.getByRole('link', { name: '← Back to dashboard' }).click();

  // The user is successfully navigated back to the dashboard page.
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.getByRole('link', { name: 'View profile →' })).toBeVisible();
});
