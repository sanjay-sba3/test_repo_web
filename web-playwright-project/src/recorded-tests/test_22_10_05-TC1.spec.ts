import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_05.recorded');

test('TC1', async ({ page }) => {
  const testData = data.T1;

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(testData.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(testData.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('link', { name: 'View profile →' })).toBeVisible();
  await page.getByRole('link', { name: 'View profile →' }).click();
  await expect(page.getByRole('link', { name: '← Back to dashboard' })).toBeVisible();
  await page.getByRole('link', { name: '← Back to dashboard' }).click();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
