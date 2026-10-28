import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_01.recorded');

test('Password field input is masked', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill('a-test-password123!');

  await expect(passwordField).toHaveAttribute('type', 'password');
});
