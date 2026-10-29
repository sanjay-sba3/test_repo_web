import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_01.recorded');

test('Unauthorized access to dashboard redirects to login', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
});
