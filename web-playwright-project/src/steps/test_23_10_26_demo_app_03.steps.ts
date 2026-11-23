import { Given, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
  mobileNumber?: string;
};

async function registerUser(
  this: JourneyWorld,
  details: {
    firstName?: string;
    lastName?: string;
    email?: string;
    age?: string;
    gender?: string;
    password?: string;
    mobileNumber?: string;
  },
) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.open('http://localhost:3000/register');

  this.email = details.email || generateValue('email');
  this.password = details.password || 'Password123!';
  this.mobileNumber = details.mobileNumber;

  await registerPage.register({
    firstName: details.firstName || generateValue('firstName'),
    lastName: details.lastName || generateValue('lastName'),
    email: this.email,
    age: details.age || '30',
    gender: details.gender || 'Prefer not to say',
    password: this.password,
    mobileNumber: this.mobileNumber,
  });
}

Given('I register a new user with default valid details', async function (this: JourneyWorld) {
  await registerUser.call(this, {});
});

Given('I register a new user with a mobile number', async function (this: JourneyWorld) {
  await registerUser.call(this, { mobileNumber: '+1-202-555-0149' });
});

Given('I register a new user with age {string}', async function (this: JourneyWorld, age: string) {
  await registerUser.call(this, { age });
});

Given('I register a new user with a 6-character password', async function (this: JourneyWorld) {
  await registerUser.call(this, { password: 'aB1#dE' });
});

When('I sign in as the newly registered user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world context. Did you register a user first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password, requireEnv('APP_OTP'));
});
