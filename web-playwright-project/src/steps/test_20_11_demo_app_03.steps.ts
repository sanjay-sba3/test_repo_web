import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

When('I attempt to register with an existing email', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstName, 'Test');
  await registerPage.fill(registerPage.lastName, 'User');
  await registerPage.fill(registerPage.emailAddress, 'test@test.com');
  await registerPage.fill(registerPage.ageYears, '25');
  await registerPage.select(registerPage.genderIdentity, 'Prefer not to say');
  await registerPage.fill(registerPage.accountPassword, 'password123');
  await registerPage.fill(registerPage.confirmPassword, 'password123');
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccountButton);
});

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';

  await registerPage.fill(registerPage.firstName, 'John');
  await registerPage.fill(registerPage.lastName, 'Doe');
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.ageYears, '30');
  await registerPage.select(registerPage.genderIdentity, 'Male');
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccountButton);
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
