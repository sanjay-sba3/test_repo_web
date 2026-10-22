import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_03.recorded');

test('TC3', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/profile');

  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In with Email' })).toBeVisible();
});
