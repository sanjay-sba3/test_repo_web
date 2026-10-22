import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_03.recorded');
const caseData = data.case_9;

test('TC4', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  const loginUrl = page.url();

  const emailField = page.getByRole('textbox', { name: 'Email Address' });
  await emailField.fill(caseData.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(caseData.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  await expect(await emailField.evaluate((el: HTMLInputElement) => el.checkValidity())).toBe(false);
  await expect(page).toHaveURL(loginUrl);
});
