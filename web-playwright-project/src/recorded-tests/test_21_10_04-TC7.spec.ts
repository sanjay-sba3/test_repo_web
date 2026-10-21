import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_04.recorded');

test('TC5', async ({ page }) => {
  const loginUrl = 'https://www.mocktestzone.in/login';

  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  await expect(page).toHaveURL(loginUrl);

  await page.getByRole('textbox', { name: 'Email Address' }).fill(data.S207_TC5.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.S207_TC5.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  const emailField = page.getByRole('textbox', { name: 'Email Address' });
  await expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  await expect(page).toHaveURL(loginUrl);
});
