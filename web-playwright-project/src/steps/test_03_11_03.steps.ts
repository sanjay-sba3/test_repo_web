import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

const LOGIN_URL = 'https://www.saucedemo.com/';

async function openAndGetLoginPage(page: CustomWorld['page']): Promise<LoginPage> {
  const loginPage = new LoginPage(page);
  await loginPage.open(LOGIN_URL);
  return loginPage;
}

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login(config.username, config.password);
});

When('I attempt to log in with an empty username', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login('', config.password);
});

When('I attempt to log in with an empty password', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login(config.username, '');
});

When('I attempt to log in with empty credentials', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login('', '');
});

When('I attempt to log in with an incorrect password', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login(config.username, 'wrongpassword123');
});

When('I attempt to log in with a non-existent username', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login(generateValue('user'), 'anypassword');
});

When('I attempt to log in with a case-incorrect password', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login(config.username, 'SECRET_SAUCE');
});

When('I attempt to log in with an XSS payload in the username', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login(generateValue('comment', 'security'), 'anypassword');
});

When('I attempt to log in with an XSS payload in the password', async function (this: CustomWorld) {
  const loginPage = await openAndGetLoginPage(this.page);
  await loginPage.login(config.username, generateValue('comment', 'security'));
});

When('I log out', async function (this: CustomWorld) {
  const inventoryPage = new InventoryPage(this.page);
  await inventoryPage.logout();
});

Then('the {string} field should be visible', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('textbox', { name })).toBeVisible();
});
