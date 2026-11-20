import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; passwordKey?: string };
const testData = await loadTestData('test_20_11_demo_app_02');

async function fillRegistrationForm(world: CustomWorld, options: { skip?: string, mobile?: string, age?: string, passwordKey?: string }) {
  const registerPage = new RegisterPage(world.page);
  const password = testData[options.passwordKey || 'password'];

  if (options.skip !== 'First name') await registerPage.fill(registerPage.firstName, 'Test');
  if (options.skip !== 'Last name') await registerPage.fill(registerPage.lastName, 'User');
  if (options.skip !== 'Email address') await registerPage.fill(registerPage.emailAddress, generateValue('email'));
  if (options.mobile) await registerPage.fill(registerPage.mobileNumber, options.mobile);
  await registerPage.fill(registerPage.age, options.age || '30');
  await registerPage.select(registerPage.gender, 'Prefer not to say');
  if (options.skip !== 'Account password') await registerPage.fill(registerPage.accountPassword, password);
  if (options.skip !== 'Confirm password') await registerPage.fill(registerPage.confirmPassword, password);
  if (options.skip !== 'I accept the terms and conditions') await registerPage.check(registerPage.acceptTerms);
}

When('I complete the registration form leaving "{string}" empty', async function (this: CustomWorld, field: string) {
  await fillRegistrationForm(this, { skip: field });
});

When('I register a new user with password {string}', async function (this: JourneyWorld, passwordKey: string) {
  this.email = generateValue('email');
  this.passwordKey = passwordKey;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: 'Test',
    lastName: 'User',
    email: this.email,
    age: '30',
    gender: 'Prefer not to say',
    password: testData[passwordKey]
  });
});

When('I register a new user with password {string} and mobile {string}', async function (this: JourneyWorld, passwordKey: string, mobile: string) {
  this.email = generateValue('email');
  this.passwordKey = passwordKey;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: 'Test',
    lastName: 'User',
    email: this.email,
    mobile,
    age: '30',
    gender: 'Female',
    password: testData[passwordKey]
  });
});

When('I register a new user with password {string} and age {string}', async function (this: JourneyWorld, passwordKey: string, age: string) {
  this.email = generateValue('email');
  this.passwordKey = passwordKey;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: 'Boundary',
    lastName: 'Test',
    email: this.email,
    age,
    gender: 'Other',
    password: testData[passwordKey]
  });
});

When('I log in as the newly registered user with password {string}', async function (this: JourneyWorld, passwordKey: string) {
  if (!this.email) throw new Error('No email was generated in a previous step.');
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, testData[passwordKey]);
});

When('I enter the OTP from test data', async function (this: CustomWorld) {
  await this.page.waitForURL(/\/otp/);
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(testData.otp);
});
