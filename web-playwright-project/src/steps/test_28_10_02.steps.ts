import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';

import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type TestData = {
  existingUserEmail: string;
};

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const passwordForNewUser = 'ValidPassword123'; // Meets minlength=6

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
});

When('I successfully register a new user', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    age: '25', // Meets min=13, max=120
    gender: 'Male', // Valid option
    password: passwordForNewUser,
  });
  await registerPage.createAccountButton.click();
});

When('I attempt to register with the existing environment email', async function (this: CustomWorld) {
  const { existingUserEmail } = await loadTestData<TestData>('test_28_10_02');
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: existingUserEmail,
    age: '30',
    gender: 'Female',
    password: passwordForNewUser,
  });
  await registerPage.createAccountButton.click();
});

When('I register a new user and remember the credentials', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = passwordForNewUser;
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: this.email,
    age: '25',
    gender: 'Female',
    password: this.password,
  });
  await registerPage.createAccountButton.click();
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I navigate from the dashboard to my profile', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.viewProfileLink.click();
});

When('I navigate from my profile back to the dashboard', async function (this: CustomWorld) {
    const profilePage = new ProfilePage(this.page);
    await profilePage.backToDashboardLink.click();
});

When('I log out from the dashboard', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.logoutButton.click();
});

Then('I should see the "Go to login" link', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await expect(registerPage.goToLoginLink).toBeVisible();
});
