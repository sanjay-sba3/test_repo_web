import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, config.password);
});

When('I add the {string} product to the cart', async function (this: CustomWorld, productName: string) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.addToCartButton(productName).click();
});

Then('the shopping cart badge should show {string}', async function (this: CustomWorld, count: string) {
  const inventoryPage = new InventoryPage(this.page);
  await expect(inventoryPage.shoppingCartBadge).toHaveText(count);
});

When('I log out', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.logout();
});
