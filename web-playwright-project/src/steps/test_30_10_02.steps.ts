import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { loadTestData } from '../support/testData.js';

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const { password } = await loadTestData('test_30_10_02');
  const loginPage = new LoginPage(this.page);
  await loginPage.open('https://www.mocktestzone.in/login');
  await loginPage.login(config.username, password);
});

When('I open the account menu', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Account menu' }).click();
});

When('I click the "{string}" menu item', async function (this: CustomWorld, menuItem: string) {
  // This locator is based on standard accessibility practices (role='menuitem') as the menu content is not in the static snapshot.
  await this.page.getByRole('menuitem', { name: menuItem }).click();
});

Then('I should see the "{string}" menu item', async function (this: CustomWorld, menuItem: string) {
  // This locator is based on standard accessibility practices (role='menuitem') as the menu content is not in the static snapshot.
  await expect(this.page.getByRole('menuitem', { name: menuItem })).toBeVisible();
});
