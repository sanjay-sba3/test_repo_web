import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

When('I register a new user with valid details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';

  await registerPage.fill('First name', generateValue('firstName'));
  await registerPage.fill('Last name', generateValue('lastName'));
  await registerPage.fill('Email address', this.email);
  await registerPage.fill('Age (years)', '30');
  await registerPage.select('Gender identity', 'Male');
  await registerPage.fill('Account password', this.password);
  await registerPage.fill('Confirm password', this.password);
  await registerPage.check('I accept the terms and conditions');
  await registerPage.click(registerPage.createAccountButton);
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you register a new user in this scenario?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP from the environment', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const password = 'ValidPassword123!';

  await registerPage.fill('First name', 'Test');
  await registerPage.fill('Last name', 'User');
  await registerPage.fill('Email address', requireEnv('APP_USERNAME'));
  await registerPage.fill('Age (years)', '30');
  await registerPage.select('Gender identity', 'Prefer not to say');
  await registerPage.fill('Account password', password);
  await registerPage.fill('Confirm password', password);
  await registerPage.check('I accept the terms and conditions');
  await registerPage.click(registerPage.createAccountButton);
});

When('I fill all registration fields except {string}', async function (this: CustomWorld, fieldToSkip: string) {
  const registerPage = new RegisterPage(this.page);
  const fields: { [key: string]: () => Promise<void> } = {
    'First name': () => registerPage.fill('First name', 'Test'),
    'Last name': () => registerPage.fill('Last name', 'User'),
    'Email address': () => registerPage.fill('Email address', generateValue('email')),
    'Age (years)': () => registerPage.fill('Age (years)', '25'),
    'Gender identity': () => registerPage.select('Gender identity', 'Male'),
    'Account password': () => registerPage.fill('Account password', 'password1234'),
    'Confirm password': () => registerPage.fill('Confirm password', 'password1234'),
    'I accept the terms and conditions': () => registerPage.check('I accept the terms and conditions'),
  };

  for (const field in fields) {
    if (field !== fieldToSkip) {
      await fields[field]();
    }
  }
});

Then('I should see the {string} textbox', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('textbox', { name })).toBeVisible();
});
