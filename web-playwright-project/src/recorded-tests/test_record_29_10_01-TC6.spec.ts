import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_01.recorded');

test('Login attempt with empty password field', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC6.email);
  await page.getByRole('button', { name: 'Sign in' }).click();
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  expect(await passwordField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  await expect(page).toHaveURL(/.*\/login/);
});
