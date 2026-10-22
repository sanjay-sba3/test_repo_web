import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData('test_22_10_06');

async function fillAndSubmitRegistration(world: JourneyWorld, overrides: any) {
  const registerPage = new RegisterPage(world.page);
  const details = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    age: '30',
    gender: 'Male',
    password: testData.password,
    confirmPassword: testData.password,
    acceptTerms: true,
    ...overrides
  };
  await registerPage.register(details);
  return details;
}

When('I register a new user with valid details', async function (this: JourneyWorld) {
  const details = await fillAndSubmitRegistration(this, {});
  this.email = details.email;
  this.password = details.password;
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world. Did you register first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I attempt to register with a duplicate email', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { email: config.username });
});

When('I attempt to register with mismatched passwords', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { confirmPassword: testData.mismatchedPassword });
});

When('I attempt to register with an invalid email format', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { email: generateValue('email', 'negative') });
});

When('I register a new user with a script in the first name', async function (this: JourneyWorld) {
  const details = await fillAndSubmitRegistration(this, { firstName: generateValue('firstName', 'security') });
  this.email = details.email;
  this.password = details.password;
});

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
});

When('I go back in the browser history', async function (this: CustomWorld) {
  await this.page.goBack();
});
