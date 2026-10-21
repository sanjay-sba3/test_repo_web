import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_04.recorded');

test('TC2', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.S208_TC2.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.S208_TC2.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  await expect(page.getByRole('button', { name: 'Account menu' })).toBeVisible();
});
