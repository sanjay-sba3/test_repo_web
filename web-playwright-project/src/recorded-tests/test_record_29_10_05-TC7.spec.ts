import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_05.recorded');

test('TC7: Login attempt with empty email and password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('status')).toHaveText('Please enter a valid email and password');
});
