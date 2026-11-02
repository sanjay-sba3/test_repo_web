import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

const LOGIN_URL = 'https://www.mocktestzone.in/login';

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  if (!this.page.url().startsWith(LOGIN_URL)) {
    await loginPage.open(LOGIN_URL);
  }
  await loginPage.login(config.username, config.password);
});

When('I navigate to the profile page from the dashboard', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToProfile();
});

When('I navigate to the dashboard from the profile page', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.navigateToDashboard();
});

When('I log out from the dashboard', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});

Given('I am logged in and on the profile page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
  await expect(this.page).toHaveURL(/.*\/dashboard/);

  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToProfile();
  await expect(this.page).toHaveURL(/.*\/profile/);
});

Then('I should see the {string} link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});
