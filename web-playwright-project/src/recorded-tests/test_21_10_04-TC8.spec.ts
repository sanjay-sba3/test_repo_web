import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_21_10_04.recorded');

test('TC1', async ({ page }) => {
  await page.goto('https://www.mocktestzone.in/account');

  await expect(page).toHaveURL('https://www.mocktestzone.in/login');
  await expect(page.getByRole('textbox', { name: 'Email Address' })).toBeVisible();
});
