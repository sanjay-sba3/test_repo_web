import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { config, requireEnv } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { VerifyPage } from '../pages/VerifyPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = await loadTestData<{ password: string }>('test_23_10_26_demo_app_02');

async function fillRegistrationForm(world: CustomWorld, options: { age: string; mobile?: string }) {
  const registerPage = new RegisterPage(world.page);
  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddress, generateValue('email'));
  await registerPage.fill(registerPage.accountPassword, testData.password);
  await registerPage.fill(registerPage.confirmPassword, testData.password);
  await registerPage.fill(registerPage.ageYears, options.age);
  if (options.mobile) {
    await registerPage.fill(registerPage.mobileNumber, options.mobile);
  }
  await registerPage.select(registerPage.genderIdentity, 'Male');
  await registerPage.check(registerPage.acceptTerms);
}

When('I fill the registration form with valid data but age {string}', async function (this: CustomWorld, age: string) {
  await fillRegistrationForm(this, { age });
});

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.fill(registerPage.ageYears, '25');
  await registerPage.select(registerPage.genderIdentity, 'Prefer not to say');
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccount);
});

When('I register a new user with a mobile number', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.mobileNumber, '+15551234567');
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.fill(registerPage.ageYears, '30');
  await registerPage.select(registerPage.genderIdentity, 'Male');
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccount);
});

async function doLogin(world: JourneyWorld, rememberEmail: boolean) {
  const loginPage = new LoginPage(world.page);
  await loginPage.fill(loginPage.email, world.email!);
  await loginPage.fill(loginPage.password, world.password!);
  if (rememberEmail) {
    await loginPage.check(loginPage.rememberMyEmail);
  }
  await loginPage.click(loginPage.signIn);

  await world.page.waitForURL(/\/otp/);
  const otpPage = new OtpPage(world.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
}

When('I sign in as the new user with OTP', async function (this: JourneyWorld) {
  await doLogin(this, false);
});

When('I sign in as the new user with OTP and remember my email', async function (this: JourneyWorld) {
  await doLogin(this, true);
});

When('I sign in as the environment user and use the single field OTP', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, config.password);

  await this.page.waitForURL(/\/otp/);
  const otpPage = new OtpPage(this.page);
  await otpPage.click(otpPage.useSingleFieldLink);

  await this.page.waitForURL(/\/verify/);
  const verifyPage = new VerifyPage(this.page);
  await verifyPage.fill(verifyPage.otpInput, requireEnv('APP_OTP'));
  await verifyPage.click(verifyPage.verifyButton);
});

Then('the \"Email\" field should have the value of the new user\'s email', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.email).toHaveValue(this.email!);
});
