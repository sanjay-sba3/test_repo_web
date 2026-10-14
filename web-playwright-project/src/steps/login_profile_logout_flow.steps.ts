import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';

When("I use the browser's 'Back' button", async function (this: CustomWorld) {
  await this.page.goBack();
});
