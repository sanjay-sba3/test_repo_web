import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

const LOGIN_URL = 'https://www.saucedemo.com/';

Given('I am logged in', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
});

When('I add the first item to the cart', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.addFirstItemToCart();
});

When('I navigate back in the browser', async function (this: CustomWorld) {
  await this.page.goBack();
});
