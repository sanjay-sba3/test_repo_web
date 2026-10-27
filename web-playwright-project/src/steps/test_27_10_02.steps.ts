import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { config } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData('test_27_10_02');

When('I register a new user with valid details', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;

  await registerPage.firstName.fill(generateValue('firstName'));
  await registerPage.lastName.fill(generateValue('lastName'));
  await registerPage.emailAddress.fill(this.email);
  await registerPage.age.fill('30');
  await registerPage.genderIdentity.selectOption('Male');
  await registerPage.accountPassword.fill(this.password);
  await registerPage.confirmPassword.fill(this.password);
  await registerPage.terms.check();
  await registerPage.createAccountButton.click();
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I attempt to register with an existing email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.firstName.fill(generateValue('firstName'));
  await registerPage.lastName.fill(generateValue('lastName'));
  await registerPage.emailAddress.fill(config.username);
  await registerPage.age.fill('30');
  await registerPage.genderIdentity.selectOption('Female');
  await registerPage.accountPassword.fill(testData.password);
  await registerPage.confirmPassword.fill(testData.password);
  await registerPage.terms.check();
  await registerPage.createAccountButton.click();
});

When('I attempt to register with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.firstName.fill(generateValue('firstName'));
  await registerPage.lastName.fill(generateValue('lastName'));
  await registerPage.emailAddress.fill(generateValue('email'));
  await registerPage.age.fill('30');
  await registerPage.genderIdentity.selectOption('Other');
  await registerPage.accountPassword.fill(testData.password);
  await registerPage.confirmPassword.fill(testData.wrongPassword);
  await registerPage.terms.check();
  await registerPage.createAccountButton.click();
});

When('I log in with an incorrect password', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.username, testData.wrongPassword);
});
