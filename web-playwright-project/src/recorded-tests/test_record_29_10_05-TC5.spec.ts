import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_05.recorded');

test('TC5: Login attempt with empty email', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  const emailField = page.getByRole('textbox', { name: 'Email' });
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC5.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/.*\/login/);
  expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
