import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData('test_30_10_01');

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('https://www.mocktestzone.in/login');
  await loginPage.login(config.username, config.password);
});

Then('I should see the "{string}" link', async function (this: CustomWorld, linkName: string) {
  await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
});

Then('I should see the "Login" link', async function (this: CustomWorld) {
  await expect(this.page.getByRole('link', { name: 'Login' })).toBeVisible();
});

// Steps for @needs-review scenario. They will fail at runtime, which is expected.
Given('I register a new user with a generated email and password from test data', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.newUserPassword;
  await this.page.goto('https://www.mocktestzone.in/register');
  await this.page.getByRole('textbox', { name: 'Email' }).fill(this.email);
  await this.page.getByRole('textbox', { name: 'Password' }).fill(this.password);
  await this.page.getByRole('textbox', { name: 'Confirm Password' }).fill(this.password);
  await this.page.getByRole('button', { name: 'Register' }).click();
});

When('I proceed to the login page from registration success', async function (this: CustomWorld) {
  await this.page.getByRole('button', { name: 'Go to Login' }).click();
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context');
  }
  await loginPage.login(this.email, this.password);
});
