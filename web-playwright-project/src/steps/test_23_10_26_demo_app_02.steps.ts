import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { VerifyPage } from '../pages/VerifyPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = await loadTestData('test_23_10_26_demo_app_02');

async function fillRegistrationForm(page: RegisterPage, data: any, skipField?: string) {
  if (skipField !== 'First name') await page.fill(page.firstName, data.firstName);
  if (skipField !== 'Last name') await page.fill(page.lastName, data.lastName);
  if (skipField !== 'Email address') await page.fill(page.emailAddress, data.email);
  if (skipField !== 'Account password') await page.fill(page.accountPassword, data.password);
  if (skipField !== 'Confirm password') await page.fill(page.confirmPassword, data.password);
  if (skipField !== 'Age (years)') await page.fill(page.age, data.age);
  if (data.mobileNumber) await page.fill(page.mobileNumber, data.mobileNumber);
  await page.select(page.gender, data.gender);
  if (skipField !== 'I accept the terms and conditions') await page.check(page.acceptTerms);
}

When('I attempt to register with an existing email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  const data = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'test@test.com',
    password: 'password123',
    age: '30',
    gender: 'Male',
  };
  await fillRegistrationForm(registerPage, data);
  await registerPage.click(registerPage.createAccountButton);
});

When('I fill all fields for a valid registration but leave {string} empty', async function (this: CustomWorld, field: string) {
  const registerPage = new RegisterPage(this.page);
  const data = {
    firstName: 'John',
    lastName: 'Doe',
    email: generateValue('email'),
    password: 'password123',
    age: '25',
    gender: 'Male',
  };
  await fillRegistrationForm(registerPage, data, field);
});

When('I fill all fields for a valid registration but with age {string}', async function (this: CustomWorld, age: string) {
  const registerPage = new RegisterPage(this.page);
  const data = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    password: 'ValidP@ssword123',
    age: age,
    gender: 'Male',
  };
  await fillRegistrationForm(registerPage, data);
});

When('I register a new user', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  const data = {
    firstName: testData.firstName,
    lastName: testData.lastName,
    email: this.email,
    password: this.password,
    age: testData.age,
    gender: testData.gender,
  };
  await fillRegistrationForm(registerPage, data);
  await registerPage.click(registerPage.createAccountButton);
});

When('I register a new user with a mobile number', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = testData.password;
  const registerPage = new RegisterPage(this.page);
  const data = {
    firstName: testData.firstName,
    lastName: testData.lastName,
    email: this.email,
    password: this.password,
    age: testData.age,
    mobileNumber: testData.mobileNumber,
    gender: 'Male',
  };
  await fillRegistrationForm(registerPage, data);
  await registerPage.click(registerPage.createAccountButton);
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) throw new Error('User not registered in this scenario');
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I log in as the new user with remember me enabled', async function (this: JourneyWorld) {
  if (!this.email || !this.password) throw new Error('User not registered in this scenario');
  const loginPage = new LoginPage(this.page);
  await loginPage.fill(loginPage.email, this.email);
  await loginPage.fill(loginPage.password, this.password);
  await loginPage.check(loginPage.rememberMyEmail);
  await loginPage.click(loginPage.signInButton);
});

When('I enter the OTP code', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I enter the OTP code on the verify page', async function (this: CustomWorld) {
  const verifyPage = new VerifyPage(this.page);
  await verifyPage.enterOtp(requireEnv('APP_OTP'));
});

Then('I should see the text {string}', async function (this: CustomWorld, text: string) {
  await expect(this.page.getByText(text, { exact: false }).first()).toBeVisible();
});

Then('the {string} field should contain my registered email', async function (this: JourneyWorld, label: string) {
  if (!this.email) throw new Error('User not registered in this scenario');
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.email).toHaveValue(this.email);
});
