import { Given, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const LOGIN_URL = 'http://localhost:3000/login';
const REGISTER_URL = 'http://localhost:3000/register';

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open(LOGIN_URL);
  await loginPage.login(config.username, config.password);
});

Given('I register a new user', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';
  const registerPage = new RegisterPage(this.page);
  await registerPage.open(REGISTER_URL);
  await registerPage.register({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: this.email,
    age: '25',
    gender: 'Male',
    password: this.password,
    confirmPassword: this.password,
    acceptTerms: true,
  });
  await expect(registerPage.goToLoginLink).toBeVisible();
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found. Did you run "I register a new user" first?');
  }
  const loginPage = new LoginPage(this.page);
  await expect(this.page).toHaveURL(/.*\/login/);
  await loginPage.login(this.email, this.password);
});
