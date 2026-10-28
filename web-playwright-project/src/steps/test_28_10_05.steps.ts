import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  // The background step already opens the login page, so we don't need to open it again.
  // If this step were used without the background, we would need: await loginPage.open('https://www.mocktestzone.in/login');
  await loginPage.login(config.username, config.password);
});

When('I open the account menu', async function (this: CustomWorld) {
  const url = this.page.url();
  if (url.includes('/dashboard')) {
    await new DashboardPage(this.page).openAccountMenu();
  } else if (url.includes('/profile')) {
    await new ProfilePage(this.page).openAccountMenu();
  } else {
    throw new Error(`Account menu not found on current page: ${url}`);
  }
});

Then('I should see the {string} menu item', async function (this: CustomWorld, itemName: string) {
  const menuItem = this.page.getByRole('menuitem', { name: itemName });
  await expect(menuItem).toBeVisible();
});

When('I click the {string} menu item', async function (this: CustomWorld, itemName: string) {
  const menuItem = this.page.getByRole('menuitem', { name: itemName });
  await menuItem.click();
});
