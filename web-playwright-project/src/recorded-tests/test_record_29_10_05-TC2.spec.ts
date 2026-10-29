import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_29_10_05.recorded');

test('TC2: Login with valid email and incorrect password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL(/.*\/login/);

  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC2.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC2.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/.*\/login/);
  await expect(page.getByRole('status')).toHaveText('Invalid email or password');
});
