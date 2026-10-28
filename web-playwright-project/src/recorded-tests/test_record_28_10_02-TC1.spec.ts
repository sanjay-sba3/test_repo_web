import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_02.recorded');

test('TC1 Successful login, profile navigation, and logout', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC1.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC1.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/.*\/dashboard/);
  await page.getByRole('link', { name: 'View profile →' }).click();
  await expect(page).toHaveURL(/.*\/profile/);
  await page.getByRole('link', { name: '← Back to dashboard' }).click();
  await expect(page).toHaveURL(/.*\/dashboard/);
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).not.toHaveURL(/.*\/dashboard/);
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
