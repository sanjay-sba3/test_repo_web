import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_01.recorded');

test('TC1', async ({ page }) => {
  // Open the home page at /
  await page.goto('http://localhost:3000/');

  // Click the "Login" link.
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Enter "${APP_USERNAME}" in the "Email" field.
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC1.username);

  // Enter "${APP_PASSWORD}" in the "Password" field.
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);

  // Click the "Sign in" button.
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  // Verify the "View profile →" link is visible.
  await expect(page.getByRole('link', { name: 'View profile →' })).toBeVisible();

  // Click the "View profile →" link.
  await page.getByRole('link', { name: 'View profile →' }).click();
  await expect(page).toHaveURL('http://localhost:3000/profile');

  // Verify the "← Back to dashboard" link is visible.
  await expect(page.getByRole('link', { name: '← Back to dashboard' })).toBeVisible();

  // Click the "← Back to dashboard" link.
  await page.getByRole('link', { name: '← Back to dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  // Verify the "Logout" button is visible.
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

  // Click the "Logout" button.
  await page.getByRole('button', { name: 'Logout' }).click();

  // Verify the user is returned to the logged-out state
  await expect(page).toHaveURL('http://localhost:3000/login');

  // Verify the "Login" link is visible on the page.
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
