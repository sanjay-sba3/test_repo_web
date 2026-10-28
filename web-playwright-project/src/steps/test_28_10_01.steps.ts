import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { user?: { firstName: string, lastName: string, email: string, password: string, age: string, gender: string } };

const testData = await loadTestData('test_28_10_01');

async function fillRegistrationForm(world: JourneyWorld, overrides: Partial<JourneyWorld['user']> = {}) {
  const registerPage = new RegisterPage(world.page);
  const user = world.user!;

  const finalUserData = { ...user, ...overrides };

  if (finalUserData.firstName) await registerPage.fillFirstName(finalUserData.firstName);
  if (finalUserData.lastName) await registerPage.fillLastName(finalUserData.lastName);
  if (finalUserData.email) await registerPage.fillEmailAddress(finalUserData.email);
  if (finalUserData.age) await registerPage.fillAge(finalUserData.age);
  if (finalUserData.gender) await registerPage.selectGender(finalUserData.gender);
  if (finalUserData.password) {
    await registerPage.fillAccountPassword(finalUserData.password);
    await registerPage.fillConfirmPassword(finalUserData.password);
  }
  await registerPage.checkTerms();
}

When('I register a new user', async function (this: JourneyWorld) {
  this.user = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    password: testData.password,
    age: '25',
    gender: 'Male'
  };
  await fillRegistrationForm(this);
  await new RegisterPage(this.page).clickCreateAccount();
});

When('I log in as the new user', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.user!.email, this.user!.password);
});

When('I attempt to register with the same user details again', async function (this: JourneyWorld) {
  await fillRegistrationForm(this);
  await new RegisterPage(this.page).clickCreateAccount();
});

When('I fill out the registration form with an invalid email', async function (this: JourneyWorld) {
  this.user = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email', 'negative'),
    password: testData.password,
    age: '25',
    gender: 'Female'
  };
  await fillRegistrationForm(this);
});

When('I attempt to log in with the environment user and a wrong password', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, generateValue('password', 'negative'));
});

When('I register a new user with an XSS probe in the first name', async function (this: JourneyWorld) {
  this.user = {
    firstName: generateValue('comment', 'security'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    password: testData.password,
    age: '30',
    gender: 'Other'
  };
  await fillRegistrationForm(this);
  await new RegisterPage(this.page).clickCreateAccount();
});

When('I fill out the registration form but leave the "{string}" empty', async function (this: JourneyWorld, field: string) {
  this.user = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    password: testData.password,
    age: '25',
    gender: 'Male'
  };

  const overrides: Partial<JourneyWorld['user']> = {};
  if (field === 'Email address') {
    overrides.email = '';
  } else if (field === 'Account password') {
    overrides.password = '';
  }

  await fillRegistrationForm(this, overrides);
});

Then('I should see the "{string}" link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});

When('I click the "{string}" link', async function (this: CustomWorld, name: string) {
  await this.page.getByRole('link', { name }).click();
});
