import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

const LOGIN_URL = 'https://www.mocktestzone.in/login';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
});

When('I navigate from dashboard to profile', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToProfile();
});

When('I navigate from profile to dashboard', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.navigateToDashboard();
});

When('I log out from the account menu', async function (this: CustomWorld) {
    // The account menu is available on multiple pages.
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.logoutFromMenu();
});
