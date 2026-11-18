import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  // The background step already opens the page, but we call it here to be explicit
  // in scenarios that don't use the background, like the E2E tests.
  if (!this.page.url().endsWith('saucedemo.com/')) {
      await loginPage.open('https://www.saucedemo.com/');
  }
  await loginPage.login(config.username, config.password);
  await this.page.waitForURL('**/inventory.html');
});

When('I add {string} to the cart', async function (this: CustomWorld, productName: string) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.addToCart(productName);
});

Then('I should see {string} on the cart badge', async function (this: CustomWorld, count: string) {
  const inventoryPage = new InventoryPage(this.page);
  await expect(inventoryPage.cartBadge).toHaveText(count);
});

When('I click the cart link', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.cartLink.click();
});

When('I log out', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.logout();
});
