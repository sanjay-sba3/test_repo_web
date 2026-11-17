import { When, Given, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { LoginPage } from '../pages/LoginPage.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

Given('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
});

When('I register a new user', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: this.email,
    age: '25',
    gender: 'Male',
    password: this.password,
  });
});

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: config.username,
    age: '30',
    gender: 'Female',
    password: 'AnotherValidPassword123!',
  });
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found. Was a user registered in this scenario?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logout();
});
