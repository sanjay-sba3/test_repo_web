import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_04.recorded');

test('TC9: Login with correct email and incorrect password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC9.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC9.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Invalid email or password')).toBeVisible();
});
