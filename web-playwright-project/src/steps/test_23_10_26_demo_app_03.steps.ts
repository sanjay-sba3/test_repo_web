import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { requireEnv } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
  mobileNumber?: string;
  age?: string;
};

async function fullRegistration(world: JourneyWorld, overrides: { [key: string]: string }) {
  const registerPage = new RegisterPage(world.page);
  world.email = generateValue('email');
  world.password = overrides.password || 'Password123!';
  world.mobileNumber = overrides.mobileNumber;
  world.age = overrides.age;

  await registerPage.open();
  await registerPage.register({
    firstName: 'Test',
    lastName: 'User',
    email: world.email,
    mobileNumber: world.mobileNumber,
    age: world.age || '30',
    gender: 'Prefer not to say',
    password: world.password,
  });
}

When('I register a new user for the E2E journey', async function (this: JourneyWorld) {
  await fullRegistration(this, {});
});

When('I register a new user with mobile number {string}', async function (this: JourneyWorld, mobile: string) {
  await fullRegistration(this, { mobileNumber: mobile });
});

When('I register a new user with age {string}', async function (this: JourneyWorld, age: string) {
  await fullRegistration(this, { age });
});

When('I register a new user with a minimum length password {string}', async function (this: JourneyWorld, password: string) {
  await fullRegistration(this, { password });
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User has not been registered in this scenario. Cannot sign in.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP code', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.submitOtp(requireEnv('APP_OTP'));
});

Then('I should see {string} for the {string} detail on the profile page', async function (this: CustomWorld, value: string, label: string) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.getDetail(label)).toHaveText(value);
});
