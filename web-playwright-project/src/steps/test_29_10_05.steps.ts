import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = loadTestData('test_29_10_05');

When('I successfully register a new user', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const email = generateValue('email');
  const password = testData.e2ePassword;
  await registerPage.register(email, password);
});

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.e2ePassword;
  await registerPage.register(this.email, this.password);
});

When('I attempt to register again with the same details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  if (!this.email || !this.password) {
    throw new Error('User details not found in world context. Did you register first?');
  }
  await registerPage.register(this.email, this.password);
});

When('I sign in as that new user', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  if (!this.email || !this.password) {
    throw new Error('User details not found in world context. Did you register first?');
  }
  await loginPage.login(this.email, this.password);
});

Then('I should see the {string} field', async function (this: CustomWorld, label: string) {
  // This is a simplified implementation. A robust one would check multiple roles.
  await expect(this.page.getByRole('textbox', { name: label })).toBeVisible();
});

Then('I should see the {string} link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});
