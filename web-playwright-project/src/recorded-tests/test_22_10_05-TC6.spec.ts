import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_05.recorded');

test('TC1', async ({ page }) => {
  const testData = data.T6;

  await page.goto('http://localhost:3000/profile');
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});
