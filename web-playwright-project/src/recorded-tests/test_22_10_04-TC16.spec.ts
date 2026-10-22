import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_04.recorded');

test('TC16: Verify Caps Lock warning disappears when Caps Lock is turned off', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.keyboard.press('CapsLock');
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.click();
  await passwordField.type(data.TC16.char);

  const capsLockWarning = page.getByText('Caps Lock is on');
  await expect(capsLockWarning).toBeVisible();

  await page.keyboard.press('CapsLock');
  await expect(capsLockWarning).not.toBeVisible();
});
