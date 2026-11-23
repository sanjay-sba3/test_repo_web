import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue, resolveTokens } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { 
  email?: string; 
  password?: string; 
  firstName?: string;
};

const testData = loadTestData('test_23_11_demo_app_01');

When('I register a new user', async function (this: JourneyWorld) {
  this.firstName = generateValue('firstName');
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: this.firstName,
    lastName: generateValue('lastName'),
    emailAddress: this.email,
    age: '30',
    gender: 'Other',
    password: this.password
  });
});

When('I register a new user with an XSS payload in the first name', async function (this: JourneyWorld) {
  this.firstName = resolveTokens('{{security.comment}}');
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: this.firstName,
    lastName: 'User',
    emailAddress: this.email,
    age: '25',
    gender: 'Prefer not to say',
    password: this.password
  });
});

When('I register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    emailAddress: requireEnv('APP_USERNAME'),
    age: '25',
    gender: 'Male',
    password: testData.password
  });
});

When('I sign in as that new user and complete OTP', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you register a new user first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
  await expect(this.page).toHaveURL(/.*\/otp/);
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});

Then('I should see the welcome message for the new user', async function (this: JourneyWorld) {
  if (!this.firstName) {
    throw new Error('First name not found. Did you register a new user first?');
  }
  await expect(this.page.getByRole('heading', { name: `Welcome back, ${this.firstName}` })).toBeVisible();
});

Then('I should see the XSS payload sanitized on the profile page', async function (this: JourneyWorld) {
  if (!this.firstName) {
    throw new Error('First name not found. Did you register a new user first?');
  }
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.profileDetails).toContainText(this.firstName);
});
