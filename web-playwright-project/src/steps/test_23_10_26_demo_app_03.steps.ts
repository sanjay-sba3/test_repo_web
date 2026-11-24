import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage, RegistrationData } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
  mobileNumber?: string;
  age?: string;
};

async function registerUser(world: JourneyWorld, overrides: Partial<RegistrationData>) {
  const registerPage = new RegisterPage(world.page);
  await registerPage.open('http://localhost:3000/register');

  world.email = overrides.email ?? generateValue('email');
  world.password = overrides.password ?? 'Password123!';
  world.mobileNumber = overrides.mobileNumber;
  world.age = overrides.age;

  const data: RegistrationData = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: world.email,
    age: world.age ?? '30',
    gender: 'Prefer not to say',
    password: world.password,
    ...overrides,
  };

  await registerPage.register(data);
}

When('I register a new user', async function (this: JourneyWorld) {
  await registerUser(this, {});
});

When('I register a new user with mobile number {string}', async function (this: JourneyWorld, mobileNumber: string) {
  await registerUser(this, { mobileNumber });
});

When('I register a new user with age {string}', async function (this: JourneyWorld, age: string) {
  await registerUser(this, { age });
});

When('I register a new user with password {string}', async function (this: JourneyWorld, password: string) {
  await registerUser(this, { password });
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you register a user in this scenario?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

Then('I should see the mobile number on the profile page', async function (this: JourneyWorld) {
  if (!this.mobileNumber) {
    throw new Error('Mobile number not set for this scenario.');
  }
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.mobileDetail).toHaveText(this.mobileNumber);
});

Then('I should see the age {string} on the profile page', async function (this: JourneyWorld, age: string) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.ageDetail).toHaveText(age);
});
