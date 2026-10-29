import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_05.recorded');

test('TC6: Login attempt with empty password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();

  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC6.email);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/.*\/login/);
  expect(await passwordField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
