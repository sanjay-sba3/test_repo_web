import { test, expect } from '@playwright/test';
import '../support/config.js';
import { loadTestData } from '../support/testData.js';

const data = loadTestData('test_record_28_10_01.recorded');

test.beforeEach(async ({ page }) => {
  // Precondition: Log in to the application
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).fill(data.TC5.username);
  await page.getByRole('textbox', { name: 'Password' }).fill(data.TC5.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test('Navigate to dashboard from profile page', async ({ page }) => {
  await page.goto('http://localhost:3000/profile');

  await page.getByRole('link', { name: '← Back to dashboard' }).click();

  await expect(page).toHaveURL(/.*\/dashboard/);
});
