import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & {
  email?: string;
  password?: string;
};

const testData = loadTestData<{ password: string; mismatchedPassword: string; age: string }>('test_20_11_demo_app_03');

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = testData.password;
  await registerPage.fill(registerPage.firstNameInput, generateValue('firstName'));
  await registerPage.fill(registerPage.lastNameInput, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddressInput, this.email);
  await registerPage.fill(registerPage.ageInput, testData.age);
  await registerPage.select(registerPage.genderIdentitySelect, 'Male');
  await registerPage.fill(registerPage.accountPasswordInput, this.password);
  await registerPage.fill(registerPage.confirmPasswordInput, this.password);
  await registerPage.check(registerPage.termsCheckbox);
  await registerPage.click(registerPage.createAccountButton);
});

When('I successfully register a new user', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstNameInput, generateValue('firstName'));
  await registerPage.fill(registerPage.lastNameInput, generateValue('lastName'));
  await registerPage.fill(registerPage.emailAddressInput, generateValue('email'));
  await registerPage.fill(registerPage.ageInput, testData.age);
  await registerPage.select(registerPage.genderIdentitySelect, 'Prefer not to say');
  await registerPage.fill(registerPage.accountPasswordInput, testData.password);
  await registerPage.fill(registerPage.confirmPasswordInput, testData.password);
  await registerPage.check(registerPage.termsCheckbox);
  await registerPage.click(registerPage.createAccountButton);
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not available. Did you register a new user first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I navigate from the dashboard to the profile page and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  const profilePage = new ProfilePage(this.page);
  await dashboardPage.click(dashboardPage.viewProfileLink);
  await this.page.waitForURL('**/profile');
  await profilePage.click(profilePage.backToDashboardLink);
});

When('I log out from the dashboard', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.click(dashboardPage.logoutButton);
});

When("I attempt to register with the environment user's email", async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstNameInput, 'Test');
  await registerPage.fill(registerPage.lastNameInput, 'User');
  await registerPage.fill(registerPage.emailAddressInput, requireEnv('APP_USERNAME'));
  await registerPage.fill(registerPage.ageInput, testData.age);
  await registerPage.select(registerPage.genderIdentitySelect, 'Prefer not to say');
  await registerPage.fill(registerPage.accountPasswordInput, testData.password);
  await registerPage.fill(registerPage.confirmPasswordInput, testData.password);
  await registerPage.check(registerPage.termsCheckbox);
  await registerPage.click(registerPage.createAccountButton);
});

When('I attempt to register with mismatched passwords', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstNameInput, 'TestFirstName');
  await registerPage.fill(registerPage.lastNameInput, 'TestLastName');
  await registerPage.fill(registerPage.emailAddressInput, generateValue('email'));
  await registerPage.fill(registerPage.ageInput, testData.age);
  await registerPage.select(registerPage.genderIdentitySelect, 'Male');
  await registerPage.check(registerPage.termsCheckbox);
  await registerPage.fill(registerPage.accountPasswordInput, testData.password);
  await registerPage.fill(registerPage.confirmPasswordInput, testData.mismatchedPassword);
  await registerPage.click(registerPage.createAccountButton);
});

When('I attempt to register leaving the {string} field empty', async function (this: CustomWorld, fieldToSkip: string) {
  const registerPage = new RegisterPage(this.page);
  const fields: { [key: string]: () => Promise<void> } = {
    'First name': () => registerPage.fill(registerPage.firstNameInput, 'Test'),
    'Last name': () => registerPage.fill(registerPage.lastNameInput, 'User'),
    'Email address': () => registerPage.fill(registerPage.emailAddressInput, generateValue('email')),
    'Age (years)': () => registerPage.fill(registerPage.ageInput, testData.age),
    'Gender identity': () => registerPage.select(registerPage.genderIdentitySelect, 'Male'),
    'Account password': () => registerPage.fill(registerPage.accountPasswordInput, testData.password),
    'Confirm password': () => registerPage.fill(registerPage.confirmPasswordInput, testData.password),
    'I accept the terms and conditions': () => registerPage.check(registerPage.termsCheckbox),
  };

  for (const field in fields) {
    if (field !== fieldToSkip) {
      await fields[field]();
    }
  }
  await registerPage.click(registerPage.createAccountButton);
});
