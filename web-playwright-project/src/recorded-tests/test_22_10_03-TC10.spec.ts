import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_22_10_03.recorded');
const caseData = data.case_10;

test('TC5', async ({ page }) => {
  page.on('dialog', () => test.fail(true, 'A dialog should not have appeared.'));

  await page.goto('https://www.mocktestzone.in/');
  await page.getByRole('link', { name: 'Login' }).click();
  const loginUrl = page.url();

  await page.getByRole('textbox', { name: 'Email Address' }).fill(caseData.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(caseData.password);
  await page.getByRole('button', { name: 'Sign In with Email' }).click();

  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page).toHaveURL(loginUrl);
});
