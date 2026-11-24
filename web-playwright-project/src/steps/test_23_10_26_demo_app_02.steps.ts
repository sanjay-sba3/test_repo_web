import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config, requireEnv } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { VerifyPage } from '../pages/VerifyPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = await loadTestData<{ password: string; mobileNumber: string }>('test_23_10_26_demo_app_02');

async function registerUser(world: JourneyWorld, withMobile: boolean) {
  const registerPage = new RegisterPage(world.page);
  world.email = generateValue('email');
  world.password = testData.password;

  await registerPage.fill(registerPage.firstName, 'Test');
  await registerPage.fill(registerPage.lastName, 'User');
  await registerPage.fill(registerPage.emailAddress, world.email);
  if (withMobile) {
    await registerPage.fill(registerPage.mobileNumber, testData.mobileNumber);
  }
  await registerPage.fill(registerPage.ageYears, '25');
  await registerPage.select(registerPage.genderIdentity, 'Prefer not to say');
  await registerPage.fill(registerPage.accountPassword, world.password);
  await registerPage.fill(registerPage.confirmPassword, world.password);
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccount);
}

When('I register a new user for the E2E flow', async function (this: JourneyWorld) {
  await registerUser(this, false);
});

When('I register a new user with a mobile number', async function (this: JourneyWorld) {
  await registerUser(this, true);
});

async function loginWithOtp(world: JourneyWorld, email: string, pass: string, remember: boolean) {
  const loginPage = new LoginPage(world.page);
  await loginPage.fill(loginPage.email, email);
  await loginPage.fill(loginPage.password, pass);
  if (remember) {
    await loginPage.check(loginPage.rememberMyEmail);
  }
  await loginPage.click(loginPage.signIn);
  await world.page.waitForURL('**/otp');

  const otpPage = new OtpPage(world.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
  await world.page.waitForURL('**/dashboard');
}

When('I log in as the new user with OTP', async function (this: JourneyWorld) {
  if (!this.email || !this.password) throw new Error('User credentials not found in world');
  await loginWithOtp(this, this.email, this.password, false);
});

When('I log in as the new user with {string} checked', async function (this: JourneyWorld, _checkboxLabel: string) {
  if (!this.email || !this.password) throw new Error('User credentials not found in world');
  await loginWithOtp(this, this.email, this.password, true);
});

Then('the {string} field should contain my email', async function (this: JourneyWorld, label: string) {
  if (!this.email) throw new Error('User email not found in world');
  const field = this.page.getByRole('textbox', { name: label });
  await expect(field).toHaveValue(this.email);
});

Given('I am logged in as the environment user up to the OTP page', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
  await this.page.waitForURL('**/otp');
});

When('I enter the OTP on the single-field page', async function (this: CustomWorld) {
  const verifyPage = new VerifyPage(this.page);
  await verifyPage.enterOtp(requireEnv('APP_OTP'));
});
