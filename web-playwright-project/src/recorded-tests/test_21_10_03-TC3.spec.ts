import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_03.recorded');

test('TC2', async ({ page }) => {
  // Expected: The browser does not display any JavaScript alert dialogs.
  page.on('dialog', dialog => {
    test.fail(true, `Unexpected dialog appeared: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

  // Test Step: Open the page at the URL 'https://www.mocktestzone.in/{{security.comment}}'.
  await page.goto(`${data.baseURL}${data.TC3.payload}`);

  // Expected: The user is shown a standard application page and not a server error page.
  // Test Step: Verify the page does not show signs of a server error.
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
