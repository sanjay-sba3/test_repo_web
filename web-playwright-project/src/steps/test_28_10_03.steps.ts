import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('https://www.mocktestzone.in/login');
  await loginPage.login(config.username, config.password);
});

When('I navigate from Dashboard to Profile', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToProfile();
});

When('I navigate from Profile to Dashboard', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.navigateToDashboard();
});

When('I log out from the Dashboard', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
