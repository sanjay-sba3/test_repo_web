import { When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { VerifyPage } from '../pages/VerifyPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
};

const fillAllValidDetails = async (page: RegisterPage, email: string, password?: string) => {
  await page.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: email,
    age: '25', // Within min 13 and max 120
    gender: 'Male', // A valid option
    password: password || 'ValidPassword123!',
  });
};

Then('I should see the {string} heading', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('heading', { name })).toBeVisible();
});

When('I register with all valid details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';
  await fillAllValidDetails(registerPage, this.email, this.password);
  await registerPage.submitRegistration();
});

When("I attempt to register with the environment user's email", async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const email = requireEnv('APP_USERNAME');
  await fillAllValidDetails(registerPage, email);
  await registerPage.submitRegistration();
});

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';
  await fillAllValidDetails(registerPage, this.email, this.password);
  await registerPage.submitRegistration();
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did "I register a new user" step run?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  await this.page.waitForURL('**/verify');
  const verifyPage = new VerifyPage(this.page);
  await verifyPage.verify(requireEnv('APP_OTP'));
});

When('I navigate from dashboard to profile and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.click(dashboardPage.viewProfileLink);
  await expect(this.page).toHaveURL(/.*\/profile/);
  const profilePage = new ProfilePage(this.page);
  await profilePage.click(profilePage.backToDashboardLink);
  await expect(this.page).toHaveURL(/.*\/dashboard/);
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.click(dashboardPage.logoutButton);
});
