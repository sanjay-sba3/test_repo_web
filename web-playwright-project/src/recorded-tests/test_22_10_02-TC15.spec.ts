import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_02.recorded');

test('TC15', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC15.password);
  const emailField = page.getByRole('textbox', { name: 'Email' });
  await page.getByRole('button', { name: 'Sign in' }).click();
  expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
});
