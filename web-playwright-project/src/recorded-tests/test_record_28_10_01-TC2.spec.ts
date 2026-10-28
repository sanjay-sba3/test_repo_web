import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_01.recorded');

test('Unauthenticated user is redirected from dashboard to login', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');

  await expect(page).toHaveURL('http://localhost:3000/login');
  await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
});
