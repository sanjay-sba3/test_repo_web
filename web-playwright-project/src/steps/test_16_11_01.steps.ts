import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

Then('I should see the {string} link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});

When('I successfully register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'aSecurePassword123!';

  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.age, '25');
  await registerPage.select(registerPage.gender, 'Male');
  await registerPage.fill(registerPage.password, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.check(registerPage.terms);
  await registerPage.click(registerPage.createAccountButton);
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world. Did you register first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});
