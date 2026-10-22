import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_04.recorded');

test('TC17: Verify Caps Lock warning does not appear for the Email field', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.keyboard.press('CapsLock');
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC17.email);

  await expect(page.getByText('Caps Lock is on')).not.toBeVisible();

  // Clean up so other tests are not affected
  await page.keyboard.press('CapsLock');
});
