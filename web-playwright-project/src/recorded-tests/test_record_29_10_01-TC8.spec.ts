import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_01.recorded');

test('Login with XSS script in Email field', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC8.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC8.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page.getByRole('status')).toHaveText('Please enter a valid email and password');
  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(data.TC8.email);
});
