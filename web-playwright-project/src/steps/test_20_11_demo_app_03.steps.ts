import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';
import { loadTestData } from '../support/testData.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = await loadTestData<{ password: string }>('test_20_11_demo_app_03');

When('I register a new user with password {string}', async function (this: JourneyWorld, password: string) {
  this.email = generateValue('email');
  this.password = password;
  const registerPage = new RegisterPage(this.page);
  await registerPage.register(this.email, this.password);
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP from the environment', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I fill all registration fields except {string}', async function (this: CustomWorld, fieldToSkip: string) {
  const registerPage = new RegisterPage(this.page);
  const password = testData.password;

  if (fieldToSkip !== 'First name') await registerPage.fill(registerPage.firstName, 'Test');
  if (fieldToSkip !== 'Last name') await registerPage.fill(registerPage.lastName, 'User');
  if (fieldToSkip !== 'Email address') await registerPage.fill(registerPage.emailAddress, generateValue('email'));
  if (fieldToSkip !== 'Age (years)') await registerPage.fill(registerPage.ageYears, '30');
  if (fieldToSkip !== 'Gender identity') await registerPage.select(registerPage.genderIdentity, 'Male');
  if (fieldToSkip !== 'Account password') await registerPage.fill(registerPage.accountPassword, password);
  if (fieldToSkip !== 'Confirm password') await registerPage.fill(registerPage.confirmPassword, password);
  if (fieldToSkip !== 'I accept the terms and conditions') await registerPage.check(registerPage.acceptTerms);
});
