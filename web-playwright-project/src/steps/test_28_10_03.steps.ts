import { When, Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { loadTestData } from '../support/testData.js';

loadTestData('test_28_10_03');

const LOGIN_URL = 'https://www.mocktestzone.in/login';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
});

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
});

When('I navigate to Profile from the account menu', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToProfile();
});

When('I navigate to Dashboard from the account menu', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.navigateToDashboard();
});

When('I log out from the account menu', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
