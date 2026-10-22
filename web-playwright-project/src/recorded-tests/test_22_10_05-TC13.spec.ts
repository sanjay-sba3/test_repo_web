import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_05.recorded');

test('TC1', async ({ page }) => {
  const testData = data.TC1_251;

  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/login');

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.fill(testData.password);

  await expect(passwordField).toHaveAttribute('type', 'password');
});
