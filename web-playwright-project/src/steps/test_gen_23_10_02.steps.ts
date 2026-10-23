import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

interface TestData {
  password: string;
  xssFullName: string;
}

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData<TestData>('test_gen_23_10_02');

async function fillRegistrationForm(page: RegisterPage, options: { except?: string, scriptFirstName?: boolean, mismatchPassword?: boolean, email?: string } = {}) {
  if (options.except !== 'First name') await page.firstName.fill(generateValue('firstName'));
  if (options.scriptFirstName) await page.firstName.fill(testData.xssFullName);
  if (options.except !== 'Last name') await page.lastName.fill(generateValue('lastName'));
  if (options.except !== 'Email address') await page.emailAddress.fill(options.email || generateValue('email'));
  if (options.except !== 'Age (years)') await page.age.fill('25');
  if (options.except !== 'Gender identity') await page.genderIdentity.selectOption('Male');
  if (options.except !== 'Account password') await page.accountPassword.fill(testData.password);
  if (options.except !== 'Confirm password') {
    const passwordToConfirm = options.mismatchPassword ? 'mismatched' : testData.password;
    await page.confirmPassword.fill(passwordToConfirm);
  }
  if (options.except !== 'I accept the terms and conditions') await page.termsCheckbox.check();
}

When('I register a new user with valid details', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  await fillRegistrationForm(registerPage, { email: this.email });
  await registerPage.createAccountButton.click();
});

When('I proceed to login and sign in as the new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.goToLoginButton.click();
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email!, this.password!);
});

When('I attempt to register with the environment user\'s email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillRegistrationForm(registerPage, { email: config.username });
  await registerPage.createAccountButton.click();
});

When('I fill the registration form with valid data but leave the {string} field empty', async function (this: CustomWorld, field: string) {
  const registerPage = new RegisterPage(this.page);
  await fillRegistrationForm(registerPage, { except: field });
});

When('I fill the registration form with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillRegistrationForm(registerPage, { mismatchPassword: true });
});

When('I attempt to log in as the new user with an incorrect password', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.goToLoginButton.click();
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email!, 'incorrect-password');
});

When('I register a user with a script in the first name field', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  await fillRegistrationForm(registerPage, { scriptFirstName: true, email: this.email });
  await registerPage.createAccountButton.click();
});

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.open('http://localhost:3000/login');
  await loginPage.login(config.username, config.password);
});

When('I navigate from the dashboard to the profile page', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.viewProfileLink.click();
});