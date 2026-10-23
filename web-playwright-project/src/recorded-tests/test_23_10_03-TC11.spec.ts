import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_23_10_03.recorded');

test('TC2', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill(data.maskedPasswordLiteral);
  await expect(passwordField).toHaveAttribute('type', 'password');
});
