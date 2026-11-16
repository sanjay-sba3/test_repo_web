import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

When('I register a new user', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(
    generateValue('firstName'),
    generateValue('lastName'),
    this.email,
    '30',
    'Female',
    this.password
  );
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you register a new user first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});
