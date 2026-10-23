import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_23_10_03.recorded');

test('TC1', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
