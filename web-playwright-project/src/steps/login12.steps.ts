import { When, Then, Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

interface LoginTestData {
  invalidPassword: string;
  anyValidPassword: string;
  nonExistentUser: string;
}

let data: LoginTestData;

async function getTestData() {
  if (!data) {
    data = await loadTestData<LoginTestData>('login12');
  }
  return data;
}

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, config.password);
});

When('I attempt to sign in with an invalid password', async function (this: CustomWorld) {
  const testData = await getTestData();
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, testData.invalidPassword);
});

When('I attempt to sign in with a non-existent user', async function (this: CustomWorld) {
  const testData = await getTestData();
  const loginPage = new LoginPage(this.page);
  await loginPage.login(testData.nonExistentUser, testData.anyValidPassword);
});

When('I navigate to my profile', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.navigateToProfile();
});

When('I navigate back to the dashboard', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.navigateBackToDashboard();
});
