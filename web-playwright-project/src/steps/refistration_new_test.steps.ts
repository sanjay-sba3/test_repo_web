import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
};

const testData = await loadTestData('refistration_new_test');

async function fillRegistrationForm(world: JourneyWorld, overrides: Record<string, string | null> = {}) {
  const registerPage = new RegisterPage(world.page);
  const data = {
    firstName: world.firstName ?? 'Test',
    lastName: world.lastName ?? 'User',
    email: world.email ?? generateValue('email'),
    mobile: '+1234567890',
    age: '30',
    gender: 'Male',
    password: world.password ?? testData.password,
    confirmPassword: world.password ?? testData.password,
    ...overrides,
  };

  if (data.firstName) await registerPage.fillFirstName(data.firstName);
  if (data.lastName) await registerPage.fillLastName(data.lastName);
  if (data.email) await registerPage.fillEmail(data.email);
  if (data.mobile) await registerPage.fillMobileNumber(data.mobile);
  if (data.age) await registerPage.fillAge(data.age);
  if (data.gender) await registerPage.selectGender(data.gender);
  if (data.password) await registerPage.fillPassword(data.password);
  if (data.confirmPassword) await registerPage.fillConfirmPassword(data.confirmPassword);
  await registerPage.checkTerms();
  await registerPage.clickCreateAccount();
}

When('I register a new user', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  this.firstName = 'Test';
  this.lastName = 'User';
  await fillRegistrationForm(this);
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world object');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I attempt to register with a duplicate email', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { email: process.env.APP_USERNAME });
});

When('I attempt to register with an invalid email format', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { email: '{{negative.email}}' });
});

When('I attempt to register with an empty password', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { password: null, confirmPassword: null });
});

When('I attempt to register with mismatched passwords', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { confirmPassword: 'differentPassword' });
});

When('I register with an XSS payload in the first name field', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  this.firstName = generateValue('comment', 'security');
  this.lastName = 'User';
  await fillRegistrationForm(this);
});

Then('I should see the text {string} User', async function (this: CustomWorld, xssPayload: string) {
  const profilePage = new ProfilePage(this.page);
  await expect(profilePage.profileHeader).toHaveText(`${xssPayload} User`);
});
