import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config, requireEnv } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const REGISTRATION_PASSWORD = 'ValidPassword123!';

async function fillRegistrationForm(page: RegisterPage, email: string, password?: string) {
  const pass = password || REGISTRATION_PASSWORD;
  await page.fill(page.firstName, generateValue('firstName'));
  await page.fill(page.lastName, generateValue('lastName'));
  await page.fill(page.emailAddress, email);
  await page.fill(page.age, '30');
  await page.select(page.gender, 'Male');
  await page.fill(page.password, pass);
  await page.fill(page.confirmPassword, pass);
  await page.check(page.termsCheckbox);
}

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
  await loginPage.enterOtp(requireEnv('APP_OTP'));
});

Given('I register a new user and land on the success page', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = REGISTRATION_PASSWORD;
  await registerPage.open('http://localhost:3000/register');
  await fillRegistrationForm(registerPage, this.email, this.password);
  await registerPage.click(registerPage.createAccountButton);
  await expect(this.page.getByRole('heading', { name: 'Registration successful' })).toBeVisible();
});

When('I fill the registration form with valid and unique data', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  await fillRegistrationForm(registerPage, this.email, REGISTRATION_PASSWORD);
});

When('I attempt to register again with the same email', async function (this: JourneyWorld) {
  if (!this.email) throw new Error('Email not set from previous registration step');
  const registerPage = new RegisterPage(this.page);
  await fillRegistrationForm(registerPage, this.email);
  await registerPage.click(registerPage.createAccountButton);
});

When('I attempt to register again with the same email in uppercase', async function (this: JourneyWorld) {
  if (!this.email) throw new Error('Email not set from previous registration step');
  const registerPage = new RegisterPage(this.page);
  await fillRegistrationForm(registerPage, this.email.toUpperCase());
  await registerPage.click(registerPage.createAccountButton);
});

When('I sign in with the new user credentials', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('Credentials not set from registration step');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.loginWithOtp(this.email, this.password, requireEnv('APP_OTP'));
});

When('I navigate from the dashboard to the profile page and back', async function (this: CustomWorld) {
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
