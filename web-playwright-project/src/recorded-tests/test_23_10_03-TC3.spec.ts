import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_23_10_03.recorded');

test('TC2', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  const loginUrl = page.url();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.randomPassword);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL(loginUrl);
});
