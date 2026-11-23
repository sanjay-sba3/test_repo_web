import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type E2eWorld = CustomWorld & { email?: string; password?: string };

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: requireEnv('APP_USERNAME'),
    age: '25',
    gender: 'Male',
    password: 'ValidPassword123!',
  });
});

When('I register a new user with a unique email', async function (this: E2eWorld) {
  this.email = generateValue('email');
  this.password = 'Password123!';
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: this.email,
    age: '30',
    gender: 'Other',
    password: this.password,
  });
});

When('I register a new user with an XSS payload in the first name', async function (this: E2eWorld) {
  this.email = generateValue('email');
  this.password = 'Password123!';
  const registerPage = new RegisterPage(this.page);
  await registerPage.register({
    firstName: generateValue('comment', 'security'),
    lastName: 'User',
    email: this.email,
    age: '25',
    gender: 'Prefer not to say',
    password: this.password,
  });
});

When('I log in as the newly registered user', async function (this: E2eWorld) {
  if (!this.email || !this.password) {
    throw new Error('User was not registered in this scenario');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP code from the environment', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.submitOtp(requireEnv('APP_OTP'));
});
