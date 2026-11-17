import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';

  await registerPage.open('http://localhost:3000/register');
  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.ageYears, '30');
  await registerPage.select(registerPage.genderIdentity, 'Male');
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccount);
});

When('I go to login and sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you run "I register a new user" first?');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.click(registerPage.goToLoginLink);

  await expect(this.page).toHaveURL(/.*\/login/);

  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I navigate from dashboard to profile and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.click(dashboardPage.viewProfileLink);
  await expect(this.page).toHaveURL(/.*\/profile/);

  const profilePage = new ProfilePage(this.page);
  await profilePage.click(profilePage.backToDashboardLink);
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.click(dashboardPage.logoutButton);
});
