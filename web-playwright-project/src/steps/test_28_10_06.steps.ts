import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

const LOGIN_URL = 'http://localhost:3000/login';

async function signInAsEnvironmentUser(world: CustomWorld) {
    const loginPage = new LoginPage(world.page);
    await loginPage.open(LOGIN_URL);
    await loginPage.login(config.username, config.password);
}

When('I sign in as the environment user', async function (this: CustomWorld) {
    await signInAsEnvironmentUser(this);
});

Given('I am a logged-in user on the dashboard page', async function (this: CustomWorld) {
    await signInAsEnvironmentUser(this);
    await expect(this.page).toHaveURL(/.*dashboard/);
});

Given('I am a logged-in user on the profile page', async function (this: CustomWorld) {
    await signInAsEnvironmentUser(this);
    await expect(this.page).toHaveURL(/.*dashboard/);
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.viewProfile();
    await expect(this.page).toHaveURL(/.*profile/);
});

When('I navigate to my profile from the dashboard', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.viewProfile();
});

When('I navigate back to the dashboard from my profile', async function (this: CustomWorld) {
    const profilePage = new ProfilePage(this.page);
    await profilePage.goBackToDashboard();
});

When('I log out from the application', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.logout();
});
