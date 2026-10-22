import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_02.recorded');

test('TC13', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC13.username);
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await page.getByRole('button', { name: 'Sign in' }).click();
  expect(await passwordField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
