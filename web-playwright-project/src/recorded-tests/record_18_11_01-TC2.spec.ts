import { test, expect } from '@playwright/test';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('record_18_11_01.recorded');

test('TC2', async ({ page }) => {
  // Open the Dashboard page (/dashboard)
  await page.goto(new URL('/dashboard', config.baseUrl).toString());

  // Verify the URL contains '/login'
  await expect(page).toHaveURL(/\/login/);

  // Verify the text 'Email' is visible on the page
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
});
