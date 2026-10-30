import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('https://www.mocktestzone.in/login');
  await loginPage.login(config.username, config.password);
});

When('I click the "{string}" menu item', async function (this: CustomWorld, name: string) {
  await this.page.getByRole('menuitem', { name }).click();
});

Then('I should see the "{string}" menu item', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('menuitem', { name })).toBeVisible();
});

Then('I should see the "{string}" link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});
