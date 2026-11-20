import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';

  await registerPage.register({
    firstName: 'John',
    lastName: 'Doe',
    email: this.email,
    age: '30',
    gender: 'Male',
    password: this.password,
  });
});

Then('I should see the registration success message', async function (this: CustomWorld) {
  await expect(this.page.getByText('Registration successful')).toBeVisible();
  await expect(this.page.getByRole('link', { name: 'Go to login' })).toBeVisible();
});

When('I log in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you run "When I register a new user" first?');
  }

  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);

  await expect(this.page).toHaveURL(/.*\/otp/);

  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});
