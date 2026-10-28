import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';

const LOGIN_URL = 'https://www.mocktestzone.in/login';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
});

When('I navigate to {string} using the account menu', async function (this: CustomWorld, linkName: string) {
  const accountMenuButton = this.page.getByRole('button', { name: 'Account menu' });
  await accountMenuButton.click();
  await this.page.getByRole('link', { name: linkName }).click();
});

When('I log out using the account menu', async function (this: CustomWorld) {
  const accountMenuButton = this.page.getByRole('button', { name: 'Account menu' });
  await accountMenuButton.click();
  await this.page.getByRole('link', { name: 'Logout' }).click();
});
