import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_23_10_03.recorded');

test('TC2', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  const emailField = page.getByRole('textbox', { name: 'Email' });
  await expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
