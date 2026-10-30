import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

Then('I should see the {string} link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const password = 'ValidPassword123!';
  await registerPage.fill(registerPage.fullName, generateValue('name'));
  await registerPage.fill(registerPage.emailAddress, requireEnv('APP_USERNAME'));
  await registerPage.fill(registerPage.password, password);
  await registerPage.fill(registerPage.confirmPassword, password);
  await registerPage.check(registerPage.terms);
  await registerPage.click(registerPage.signUpWithEmail);
});

When('I register a new user', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'S3cureP@ssw0rd!';
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(generateValue('name'), this.email, this.password);
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context. Did "I register a new user" run?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I navigate to the profile page from the account menu', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.openProfile();
});

When('I navigate to the dashboard page from the account menu', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.openDashboard();
});

When('I log out from the account menu', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
