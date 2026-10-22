import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_04.recorded');

test('TC12: Login with invalid email format', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  const loginUrl = page.url();

  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC12.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC12.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Please enter a valid email and password')).toBeVisible();
  await expect(page).toHaveURL(loginUrl);
});
