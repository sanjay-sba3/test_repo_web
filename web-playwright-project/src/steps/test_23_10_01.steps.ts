import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData('test_23_10_01');

When('I register a new user with valid details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await registerPage.registerUser({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
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

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
  await expect(this.page).toHaveURL(/.*dashboard/);
});

When('I attempt to register again with the same email', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context.');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.registerUser({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: this.email,
    age: '30',
    gender: 'Male',
    password: this.password,
  });
});

When('I fill the registration form with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddress, generateValue('email'));
  await registerPage.fill(registerPage.age, '25');
  await registerPage.select(registerPage.genderIdentity, 'Female');
  await registerPage.fill(registerPage.accountPassword, testData.password);
  await registerPage.fill(registerPage.confirmPassword, testData.mismatchedPassword);
  await registerPage.check(registerPage.termsAndConditions);
});

When('I click the "View profile →" link', async function (this: CustomWorld) {
  await new DashboardPage(this.page).viewProfileLink.click();
});

When('I click the "← Back to dashboard" link', async function (this: CustomWorld) {
  await new ProfilePage(this.page).backToDashboardLink.click();
});

Then('I should see the "View profile →" link', async function (this: CustomWorld) {
  await expect(new DashboardPage(this.page).viewProfileLink).toBeVisible();
});
