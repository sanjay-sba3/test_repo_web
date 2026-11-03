import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { resolveTokens } from '../support/testDataGenerator.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

const LOGIN_URL = 'https://www.saucedemo.com/';

Given('I am logged in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
  await this.page.waitForURL(/\/inventory\.html/);
});

When('I attempt to log in with username {string} and password {string}', async function (this: CustomWorld, username: string, password_param: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(resolveTokens(username), resolveTokens(password_param));
});

When('I attempt to log in with the environment username and password {string}', async function (this: CustomWorld, password_param: string) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, resolveTokens(password_param));
});

When('I log out', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.logout();
});
