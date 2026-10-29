import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = await loadTestData('test_29_10_01');

When('I register with valid and unique data', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(
    generateValue('firstName'),
    generateValue('lastName'),
    generateValue('email'),
    testData.mobileNumber,
    testData.age,
    testData.gender,
    testData.validPassword,
    testData.validPassword
  );
});

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(
    generateValue('firstName'),
    generateValue('lastName'),
    testData.existingUserEmail,
    testData.mobileNumber,
    testData.age,
    testData.gender,
    testData.validPassword,
    testData.validPassword
  );
});

When('I attempt to register with an empty email address', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.age, testData.age);
  await registerPage.select(registerPage.genderIdentity, testData.gender);
  await registerPage.fill(registerPage.accountPassword, testData.validPassword);
  await registerPage.fill(registerPage.confirmPassword, testData.validPassword);
  await registerPage.check(registerPage.terms);
  await registerPage.click(registerPage.createAccount);
});

When('I attempt to register with an empty password', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddress, generateValue('email'));
  await registerPage.fill(registerPage.age, testData.age);
  await registerPage.select(registerPage.genderIdentity, testData.gender);
  await registerPage.check(registerPage.terms);
  await registerPage.click(registerPage.createAccount);
});

Then('I should see the {string} link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});

When('I register a new user for the E2E journey', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.e2ePassword;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(
    generateValue('firstName'),
    generateValue('lastName'),
    this.email,
    testData.mobileNumber,
    testData.age,
    testData.gender,
    this.password,
    this.password
  );
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});
