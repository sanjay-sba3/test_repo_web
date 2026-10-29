import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_01.recorded');

test('Login with valid email and incorrect password fails', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC4.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC4.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('status')).toHaveText('Invalid email or password');
  await expect(page).toHaveURL(/.*\/login/);
});
