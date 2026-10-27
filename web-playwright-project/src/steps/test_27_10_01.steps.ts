import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = await loadTestData('test_27_10_01');

When('I register a new user with valid details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;
  await registerPage.register({
    ...testData,
    emailAddress: this.email,
    accountPassword: this.password,
    confirmPassword: this.password,
    acceptTerms: true,
  });
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context. Did you register first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I navigate from the dashboard to my profile and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.viewProfile();
  const profilePage = new ProfilePage(this.page);
  await profilePage.backToDashboard();
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    ...testData,
    emailAddress: testData.existingEmail,
    accountPassword: testData.password,
    confirmPassword: testData.password,
    acceptTerms: true,
  });
});

When('I attempt to register with an empty "First name"', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    ...testData,
    firstName: '',
    emailAddress: generateValue('email'),
    accountPassword: testData.password,
    confirmPassword: testData.password,
    acceptTerms: true,
  });
});

When('I attempt to register with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    ...testData,
    emailAddress: generateValue('email'),
    accountPassword: testData.password,
    confirmPassword: testData.mismatchedPassword,
    acceptTerms: true,
  });
});

When('I attempt to register with a password shorter than 6 characters', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    ...testData,
    emailAddress: generateValue('email'),
    accountPassword: testData.shortPassword,
    confirmPassword: testData.shortPassword,
    acceptTerms: true,
  });
});

When('I attempt to register without accepting the terms', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    ...testData,
    emailAddress: generateValue('email'),
    accountPassword: testData.password,
    confirmPassword: testData.password,
    acceptTerms: false,
  });
});

When('I attempt to register with an invalid email format', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    ...testData,
    emailAddress: '{{negative.email}}',
    accountPassword: testData.password,
    confirmPassword: testData.password,
    acceptTerms: true,
  });
});
