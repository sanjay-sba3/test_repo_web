import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_01.recorded');

test('Login attempt with valid email and empty password', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  const currentUrl = page.url();

  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC3.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC3.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(currentUrl);
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  expect(await passwordField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
