import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type FlowWorld = CustomWorld & { email?: string; password?: string };

When('I register a new user with password {string}', async function (this: FlowWorld, password: string) {
  this.email = generateValue('email');
  this.password = password;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(this.email, this.password);
});

When('I register the same user again with password {string}', async function (this: FlowWorld, password: string) {
  if (!this.email) {
    throw new Error('Email not found in world context. Did you register a new user first?');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(this.email, password);
});

When('I log in as the new user', async function (this: FlowWorld) {
  if (!this.email || !this.password) {
    throw new Error('Credentials not found in world context. Did you register a new user first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I click the "View profile →" link', async function (this: CustomWorld) {
  await new DashboardPage(this.page).viewProfile.click();
});

When('I click the "← Back to dashboard" link', async function (this: CustomWorld) {
  await new ProfilePage(this.page).backToDashboard.click();
});

When('I click the "Logout" button', async function (this: CustomWorld) {
  await new DashboardPage(this.page).logout.click();
});

Then('I should see the "Go to login" link', async function (this: CustomWorld) {
  await new RegisterPage(this.page).expectVisible(new RegisterPage(this.page).goToLoginLink);
});

Then('I should see the "Login" link', async function (this: CustomWorld) {
  await new LoginPage(this.page).expectVisible(new LoginPage(this.page).loginLink);
});
