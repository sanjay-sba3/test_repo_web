import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv, config } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { loadTestData } from '../support/testData.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = await loadTestData<{ password: string }>('test_20_11_demo_app_03');

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await registerPage.register({
    firstName: 'John',
    lastName: 'Doe',
    email: this.email,
    age: '30',
    gender: 'Male',
    password: this.password,
  });
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I navigate to my profile', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.viewProfile();
});

When('I navigate back to the dashboard', async function (this: CustomWorld) {
  const profilePage = new ProfilePage(this.page);
  await profilePage.backToDashboard();
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
