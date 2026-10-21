import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC5', async ({ page }) => {
  // Test Step: Open the URL 'https://www.mocktestzone.in/%27'
  await page.goto(data.TC8.url);

  // Expected: The application handles the invalid character gracefully and redirects the user to the main home page (https://www.mocktestzone.in/) without displaying a server error.
  await expect(page).toHaveURL(data.baseURL);
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
