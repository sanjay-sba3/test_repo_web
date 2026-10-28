import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

interface TestData {
  password: string;
  mismatchedPassword: string;
}

type JourneyWorld = CustomWorld & { 
  email?: string; 
  password?: string; 
  testData?: TestData;
};

Given('I have test data for registration', async function (this: JourneyWorld) {
  this.testData = await loadTestData<TestData>('test_28_10_04');
});

When('I fill the registration form with valid data', async function (this: JourneyWorld) {
  if (!this.testData) {
    this.testData = await loadTestData<TestData>('test_28_10_04');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    age: '30',
    gender: 'Male',
    password: this.testData.password,
    confirmPassword: this.testData.password,
    acceptTerms: true
  });
});

When('I register a new user', async function (this: JourneyWorld) {
  if (!this.testData) {
    this.testData = await loadTestData<TestData>('test_28_10_04');
  }
  this.email = generateValue('email');
  this.password = this.testData.password;
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: this.email,
    age: '30',
    gender: 'Male',
    password: this.password,
    confirmPassword: this.password,
    acceptTerms: true
  });
  await registerPage.createAccountButton.click();
});

When('I attempt to register with the same new user credentials', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: this.email!,
    age: '30',
    gender: 'Male',
    password: this.password!,
    confirmPassword: this.password!,
    acceptTerms: true
  });
  await registerPage.createAccountButton.click();
});

When('I log in as the new user', async function (this: JourneyWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email!, this.password!);
});

When('I fill the registration form with mismatched passwords', async function (this: JourneyWorld) {
  if (!this.testData) {
    this.testData = await loadTestData<TestData>('test_28_10_04');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    age: '30',
    gender: 'Male',
    password: this.testData.password,
    confirmPassword: this.testData.mismatchedPassword,
    acceptTerms: true
  });
});

When('I fill the registration form but leave the email empty', async function (this: JourneyWorld) {
  if (!this.testData) {
    this.testData = await loadTestData<TestData>('test_28_10_04');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: '',
    age: '30',
    gender: 'Male',
    password: this.testData.password,
    confirmPassword: this.testData.password,
    acceptTerms: true
  });
});

When('I fill the registration form with an invalid email', async function (this: JourneyWorld) {
  if (!this.testData) {
    this.testData = await loadTestData<TestData>('test_28_10_04');
  }
  const registerPage = new RegisterPage(this.page);
  await registerPage.fillRegistrationForm({
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email', 'negative'),
    age: '30',
    gender: 'Male',
    password: this.testData.password,
    confirmPassword: this.testData.password,
    acceptTerms: true
  });
});

When('I use the browser back button', async function (this: CustomWorld) {
  await this.page.goBack();
});

Then('I should see the {string} link', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('link', { name })).toBeVisible();
});
