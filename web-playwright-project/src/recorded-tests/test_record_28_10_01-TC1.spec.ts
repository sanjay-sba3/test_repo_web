import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_01.recorded');

test('Successful sign-in, profile navigation, and logout', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC1.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await expect(page.getByRole('link', { name: 'View profile →' })).toBeVisible();
  await page.getByRole('link', { name: 'View profile →' }).click();
  await expect(page).toHaveURL('http://localhost:3000/profile');

  await expect(page.getByRole('link', { name: '← Back to dashboard' })).toBeVisible();
  await page.getByRole('link', { name: '← Back to dashboard' }).click();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();

  // After logout, user is redirected to the login page.
  await expect(page).toHaveURL('http://localhost:3000/login');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
});
