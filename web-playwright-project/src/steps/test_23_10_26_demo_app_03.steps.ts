import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
  mobileNumber?: string;
};

async function completeRegistration(
  world: JourneyWorld,
  overrides: { mobileNumber?: string; age?: string; password?: string },
) {
  const registerPage = new RegisterPage(world.page);
  world.email = generateValue('email');
  world.password = overrides.password || 'Password123!';

  await registerPage.firstName.fill(generateValue('firstName'));
  await registerPage.lastName.fill(generateValue('lastName'));
  await registerPage.emailAddress.fill(world.email);
  if (overrides.mobileNumber) {
    world.mobileNumber = overrides.mobileNumber;
    await registerPage.mobileNumber.fill(world.mobileNumber);
  }
  await registerPage.age.fill(overrides.age || '30');
  await registerPage.genderIdentity.selectOption('Prefer not to say');
  await registerPage.accountPassword.fill(world.password);
  await registerPage.confirmPassword.fill(world.password);
  await registerPage.acceptTerms.check();
  await registerPage.createAccountButton.click();
}

When('I register a new user', async function (this: JourneyWorld) {
  await completeRegistration(this, {});
});

When('I register a new user with mobile number {string}', async function (this: JourneyWorld, mobileNumber: string) {
  await completeRegistration(this, { mobileNumber });
});

When('I register a new user with age {string}', async function (this: JourneyWorld, age: string) {
  await completeRegistration(this, { age });
});

When('I register a new user with password {string}', async function (this: JourneyWorld, password: string) {
  await completeRegistration(this, { password });
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you register a new user in a previous step?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);

  await expect(this.page).toHaveURL(/.*\/otp/);
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

Then('I should see the mobile number {string} on my profile', async function (this: CustomWorld, mobileNumber: string) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.getMobileDetail()).toHaveText(mobileNumber);
});

Then('I should see the age {string} on my profile', async function (this: CustomWorld, age: string) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.getAgeDetail()).toHaveText(age);
});
