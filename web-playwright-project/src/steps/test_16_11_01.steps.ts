import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const REGISTER_URL = 'http://localhost:3000/register';
const LOGIN_URL = 'http://localhost:3000/login';

async function fillRegistrationForm(world: JourneyWorld, email: string, password?: string) {
  const registerPage = new RegisterPage(world.page);
  const finalPassword = password || 'ValidPassword123!';

  await registerPage.firstName.fill(generateValue('firstName'));
  await registerPage.lastName.fill(generateValue('lastName'));
  await registerPage.emailAddress.fill(email);
  await registerPage.mobileNumber.fill('1234567890');
  await registerPage.ageYears.fill('25');
  await registerPage.genderIdentity.selectOption('Male');
  await registerPage.accountPassword.fill(finalPassword);
  await registerPage.confirmPassword.fill(finalPassword);
  await registerPage.acceptTerms.check();
}

When('I register with valid and unique data', async function (this: JourneyWorld) {
  this.email = generateValue('email', 'random');
  this.password = 'ValidPassword123!';

  await fillRegistrationForm(this, this.email, this.password);

  const registerPage = new RegisterPage(this.page);
  await registerPage.createAccountButton.click();
});

Given('I have registered a new user', async function (this: JourneyWorld) {
  await this.page.goto(REGISTER_URL);
  this.email = generateValue('email', 'random');
  this.password = 'ValidPassword123!';

  await fillRegistrationForm(this, this.email, this.password);

  const registerPage = new RegisterPage(this.page);
  await registerPage.createAccountButton.click();
  await expect(registerPage.goToLoginLink).toBeVisible();
});

When('I attempt to register again with the same email', async function (this: JourneyWorld) {
  await this.page.goto(REGISTER_URL);
  if (!this.email) {
    throw new Error('Email not found in world context. Did you register a user first?');
  }
  await fillRegistrationForm(this, this.email, this.password);

  const registerPage = new RegisterPage(this.page);
  await registerPage.createAccountButton.click();
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context. Did you register first?');
  }
  await loginPage.login(this.email, this.password);
});

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
});

When('I navigate from the dashboard to the profile page and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  const profilePage = new ProfilePage(this.page);

  await dashboardPage.viewProfileLink.click();
  await expect(this.page).toHaveURL(/.*\/profile/);

  await profilePage.backToDashboardLink.click();
  await expect(this.page).toHaveURL(/.*\/dashboard/);
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logoutButton.click();
});
