import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_02.recorded');

test('TC14', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  const currentUrl = page.url();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC14.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC14.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(currentUrl);
  await expect(page.getByRole('alert')).toBeVisible();
});
