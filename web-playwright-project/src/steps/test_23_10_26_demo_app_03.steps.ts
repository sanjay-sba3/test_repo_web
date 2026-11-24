import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv, config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
  mobileNumber?: string;
};

const testData = loadTestData('test_23_10_26_demo_app_03');

async function registerUser(world: JourneyWorld, overrides: { [key: string]: string } = {}) {
  world.email = overrides.email || generateValue('email');
  world.password = overrides.password || 'Password123!';
  world.mobileNumber = overrides.mobileNumber;

  const registerPage = new RegisterPage(world.page);
  await registerPage.register({
    firstName: overrides.firstName || 'Test',
    lastName: overrides.lastName || 'User',
    email: world.email,
    mobileNumber: world.mobileNumber,
    age: overrides.age || '30',
    gender: overrides.gender || 'Prefer not to say',
    password: world.password,
  });
}

When('I attempt to register with the environment user\'s email', async function (this: JourneyWorld) {
  await registerUser(this, { email: config.username });
});

When('I register a new user with valid details', async function (this: JourneyWorld) {
  await registerUser(this);
});

When('I register a new user with mobile number {string}', async function (this: JourneyWorld, mobileNumber: string) {
  await registerUser(this, { mobileNumber });
});

When('I register a new user with age {string}', async function (this: JourneyWorld, age: string) {
  await registerUser(this, { age });
});

When('I register a new user with a 6-character password', async function (this: JourneyWorld) {
  await registerUser(this, { password: 'aB1#dE' });
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Was a user registered in this scenario?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I navigate to my profile and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.openProfile();
  await expect(this.page).toHaveURL(/.*\/profile/);
  const profilePage = new ProfilePage(this.page);
  await profilePage.goBackToDashboard();
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});

Then('my mobile number {string} should be visible on my profile', async function (this: CustomWorld, mobile: string) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.getDetail('Mobile')).toHaveText(mobile);
});

Then('my age {string} should be visible on my profile', async function (this: CustomWorld, age: string) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.getDetail('Age')).toHaveText(age);
});
