import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_01.recorded');

test('TC1', async ({ page }) => {
  // Open the Profile page (/profile)
  await page.goto('http://localhost:3000/profile');

  // Verify the URL contains '/login'
  await expect(page).toHaveURL(/.*\/login/);

  // Verify the 'Email' field is visible
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
});
