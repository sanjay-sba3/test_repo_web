import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = await loadTestData('registration_of_new_user');

async function fillCommonRegistrationFields(page: RegisterPage, excludeField?: string) {
  if (excludeField !== 'firstName') await page.fill(page.firstName, generateValue('firstName'));
  if (excludeField !== 'lastName') await page.fill(page.lastName, generateValue('lastName'));
  if (excludeField !== 'age') await page.fill(page.age, testData.age);
  if (excludeField !== 'gender') await page.select(page.genderIdentity, 'Male');
  if (excludeField !== 'terms') await page.check(page.terms);
}

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await fillCommonRegistrationFields(registerPage);
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.click(registerPage.createAccount);
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world. Make sure to register first.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

Given('I am logged in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
  await expect(this.page).toHaveURL(/.*\/dashboard/);
});

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillCommonRegistrationFields(registerPage);
  await registerPage.fill(registerPage.emailAddress, config.username);
  await registerPage.fill(registerPage.accountPassword, testData.password);
  await registerPage.fill(registerPage.confirmPassword, testData.password);
  await registerPage.click(registerPage.createAccount);
});

When('I attempt to register with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillCommonRegistrationFields(registerPage);
  await registerPage.fill(registerPage.emailAddress, generateValue('email'));
  await registerPage.fill(registerPage.accountPassword, testData.password);
  await registerPage.fill(registerPage.confirmPassword, testData.mismatchedPassword);
  await registerPage.click(registerPage.createAccount);
});

When('I attempt to register with a blank email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillCommonRegistrationFields(registerPage);
  await registerPage.fill(registerPage.accountPassword, testData.password);
  await registerPage.fill(registerPage.confirmPassword, testData.password);
  await registerPage.click(registerPage.createAccount);
});

When('I attempt to register with a blank password', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillCommonRegistrationFields(registerPage);
  await registerPage.fill(registerPage.emailAddress, generateValue('email'));
  await registerPage.click(registerPage.createAccount);
});

When('I register a new user with a script in the first name', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await fillCommonRegistrationFields(registerPage, 'firstName');
  await registerPage.fill(registerPage.firstName, testData.xssPayload);
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.click(registerPage.createAccount);
});
