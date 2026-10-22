import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_04.recorded');

test('TC8: User is redirected to originally requested page after login', async ({ page }) => {
  await page.goto('http://localhost:3000/profile');
  await expect(page).toHaveURL(/.*\/login/);

  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC8.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC8.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Signed in, redirecting…')).toBeVisible();
  await expect(page).toHaveURL(/.*\/profile/);
});
