import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

type TestData = {
  invalidPassword: string;
  genericPassword: string;
};

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, config.password);
});

When('I attempt to sign in with an invalid password', async function (this: CustomWorld) {
  const testData = await loadTestData<TestData>('login_testing');
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, testData.invalidPassword);
});

When('I attempt to sign in with a non-existent user', async function (this: CustomWorld) {
  const testData = await loadTestData<TestData>('login_testing');
  const loginPage = new LoginPage(this.page);
  const randomEmail = generateValue('email');
  await loginPage.login(randomEmail, testData.genericPassword);
});

When('I attempt to sign in with an XSS payload', async function (this: CustomWorld) {
  const testData = await loadTestData<TestData>('login_testing');
  const loginPage = new LoginPage(this.page);
  const xssPayload = generateValue('comment', 'security');
  await loginPage.login(xssPayload, testData.genericPassword);
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
