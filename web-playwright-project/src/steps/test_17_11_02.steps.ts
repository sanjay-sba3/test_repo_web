import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = await loadTestData<{ password: string }>('test_17_11_02');

async function fillFullRegistrationForm(page: RegisterPage, email: string) {
  await page.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: email,
    age: '30',
    gender: 'Male',
    password: testData.password,
    confirmPassword: testData.password,
  });
}

When('I successfully register a new user', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillFullRegistrationForm(registerPage, generateValue('email'));
  await registerPage.createAccount.click();
});

When('I attempt to register with an empty email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  // Fill all fields except email
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: '',
    age: '25',
    gender: 'Female',
    password: testData.password,
    confirmPassword: testData.password,
  });
});

When('I attempt to register with an existing email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await fillFullRegistrationForm(registerPage, requireEnv('APP_USERNAME'));
  await registerPage.createAccount.click();
});

When('I register a new user and go to login', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  await fillFullRegistrationForm(registerPage, this.email);
  await registerPage.createAccount.click();
  await expect(registerPage.goToLoginLink).toBeVisible();
  await registerPage.goToLoginLink.click();
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not generated. Did you run `I register a new user...` first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);

  await this.page.waitForURL('**/otp');
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I log out', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.logoutButton.click();
});
