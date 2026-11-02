import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, config.password);
});

When('I navigate to the profile page', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToProfile();
});

When('I navigate back to the dashboard', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.navigateToDashboard();
});

When('I log out from the dashboard', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});

Then('the "Password" field should be masked', async function (this: CustomWorld) {
  const passwordField = this.page.getByLabel('Password');
  await expect(passwordField).toHaveAttribute('type', 'password');
});

Then('I should see the "Login" link', async function (this: CustomWorld) {
  await expect(this.page.getByRole('link', { name: 'Login' })).toBeVisible();
});
