import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { InventoryPage } from '../pages/InventoryPage.js';

When('I logout', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.logout();
});
