import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_04.recorded');

test('TC15: Verify Caps Lock warning appears when typing in the password field', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.keyboard.press('CapsLock');
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.click();
  await passwordField.type(data.TC15.char);

  await expect(page.getByText('Caps Lock is on')).toBeVisible();

  // Clean up so other tests are not affected
  await page.keyboard.press('CapsLock');
});
