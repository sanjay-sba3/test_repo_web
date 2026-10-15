import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string; xssPayload?: string };

const testData = loadTestData('registration_of_new_user');

When('I register a new user with valid details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;
  await registerPage.register(this.email, this.password, this.password);
});

When('I sign in as the newly registered user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Ensure registration step runs first.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I attempt to register with an existing email', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(config.username, testData.password, testData.password);
});

When('I attempt to register with mismatched passwords', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(generateValue('email'), testData.password, testData.mismatchedPassword, false);
});

When('I attempt to register leaving the "{string}" field blank', async function (this: JourneyWorld, field: string) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.registerWithBlankField(field);
});

When('I register a user with a script in the first name', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;
  this.xssPayload = generateValue('comment', 'security');
  await registerPage.register(this.email, this.password, this.password, true, this.xssPayload);
});

Then('I should see the script as plain text in the profile', async function (this: JourneyWorld) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.firstNameValue).toHaveText(this.xssPayload!);
});

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
});

When('I navigate from dashboard to profile', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.goToProfile();
});

When('I navigate from profile to dashboard', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.goBackToDashboard();
});

When('I logout from the application', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
