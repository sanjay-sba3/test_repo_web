import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_02.recorded');

test('TC3', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL(/.*\/login/);
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC3.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC3.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL('http://localhost:3000/login');
  expect(page.url()).not.toContain('/dashboard');
  // From UI discovery for failed login
  await expect(page.getByRole('status')).toHaveText('Invalid email or password');
});
