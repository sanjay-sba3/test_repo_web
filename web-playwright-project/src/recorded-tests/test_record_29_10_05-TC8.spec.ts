import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_05.recorded');

test('TC8: Verify password field masks input on Login page', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill(data.TC8.password);

  await expect(passwordField).toHaveAttribute('type', 'password');
});
