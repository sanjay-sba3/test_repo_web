import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC1', async ({ page }) => {
  // Test Step: Open the page at the URL 'https://www.mocktestzone.in/%27'.
  await page.goto(`${data.baseURL}%27`);

  // Expected: The browser redirects to the standard homepage 'https://www.mocktestzone.in/'.
  // Test Step: Verify the URL becomes 'https://www.mocktestzone.in/'.
  await expect(page).toHaveURL(data.baseURL);

  // Expected: The page content loads correctly without any server error messages.
  // Test Step: Verify a link with the text 'Login' is visible on the page.
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
