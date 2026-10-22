import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData('flow34');

async function fillAllRequiredFields(registerPage: RegisterPage, overrides: { [key: string]: any } = {}) {
  const defaults = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    emailAddress: generateValue('email'),
    mobileNumber: testData.mobileNumber,
    age: testData.age,
    gender: testData.gender,
    password: testData.password,
    confirmPassword: testData.password,
    acceptTerms: true,
  };

  const data = { ...defaults, ...overrides };

  await registerPage.fillAndSubmitRegistrationForm(data);
}

When('I register a new user with valid details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await fillAllRequiredFields(registerPage, {
    emailAddress: this.email,
    password: this.password,
    confirmPassword: this.password,
  });
});

When('I log in as the newly registered user', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world. Was a user registered in this scenario?');
  }
  await loginPage.login(this.email, this.password);
});

When('I navigate from dashboard to profile and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.viewProfile();
  const profilePage = new ProfilePage(this.page);
  await profilePage.backToDashboard();
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});

When('I attempt to register with a duplicate email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillAllRequiredFields(registerPage, { emailAddress: testData.duplicateEmail });
});

When('I attempt to register with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillAllRequiredFields(registerPage, { confirmPassword: testData.mismatchedPassword });
});

When('I attempt to register with an invalid email format', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillAllRequiredFields(registerPage, { emailAddress: '{{negative.email}}' });
});

When('I attempt to register with the \"{string}\" field empty', async function (this: CustomWorld, field: string) {
  const registerPage = new RegisterPage(this.page);
  const overrides: { [key: string]: any } = { };
  if (field === 'First name') {
    overrides.firstName = '';
  }
  await fillAllRequiredFields(registerPage, overrides);
});

When('I attempt to log in with an incorrect password', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  if (!this.email) {
    throw new Error('User email not found in world. Was a user registered in this scenario?');
  }
  await loginPage.login(this.email, testData.wrongPassword);
});
