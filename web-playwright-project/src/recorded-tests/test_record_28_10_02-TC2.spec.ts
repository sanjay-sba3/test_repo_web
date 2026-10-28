import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_02.recorded');

test('TC2', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
});
