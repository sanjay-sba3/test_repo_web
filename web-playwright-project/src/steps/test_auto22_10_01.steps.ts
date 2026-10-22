import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type TestWorld = CustomWorld & { email?: string; password?: string; firstName?: string };
const testData = await loadTestData('test_auto22_10_01');

async function performRegistration(world: TestWorld, overrides: object) {
  const registerPage = new RegisterPage(world.page);
  const registrationData = {
    firstName: world.firstName ?? generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: world.email ?? generateValue('email'),
    age: '30',
    gender: 'Male',
    password: world.password ?? testData.password,
    ...overrides,
  };
  await registerPage.register(registrationData);
}

When('I register a new user with unique details', async function (this: TestWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  this.firstName = generateValue('firstName');
  await performRegistration(this, {});
});

When('I log in as the newly registered user', async function (this: TestWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I navigate to my profile from the dashboard', async function (this: CustomWorld) {
  await new DashboardPage(this.page).viewProfile();
});

When('I navigate back to the dashboard from my profile', async function (this: CustomWorld) {
  await new ProfilePage(this.page).backToDashboard();
});

When('I log out from the dashboard', async function (this: CustomWorld) {
  await new DashboardPage(this.page).logout();
});

When('I fill the registration form but omit the email address', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.firstName.fill('Test');
  await registerPage.lastName.fill('User');
  await registerPage.age.fill('25');
  await registerPage.genderIdentity.selectOption('Female');
  await registerPage.accountPassword.fill(testData.password);
  await registerPage.confirmPassword.fill(testData.password);
  await registerPage.terms.check();
});

Given('I register a new user with a unique email', async function (this: TestWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  await registerPage.open('http://localhost:3000/register');
  await performRegistration(this, {});
  await expect(this.page.getByText('Registration successful')).toBeVisible();
});

When('I attempt to register again with the same email', async function (this: TestWorld) {
  await performRegistration(this, { email: this.email });
});

When('I attempt to register again with a case-variant of the same email', async function (this: TestWorld) {
  const caseVariantEmail = this.email!.charAt(0).toUpperCase() + this.email!.slice(1);
  await performRegistration(this, { email: caseVariantEmail });
});

When('I register a new user with an XSS string in the first name', async function (this: TestWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  this.firstName = generateValue('comment', 'security');
  await performRegistration(this, {});
});
