import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string; firstName?: string };

When('I register a new user', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'Password123!';
  this.firstName = 'Test';

  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstName, this.firstName);
  await registerPage.fill(registerPage.lastName, 'User');
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.age, '30');
  await registerPage.select(registerPage.genderIdentity, 'Other');
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccount);
});

When('I register a new user with an XSS payload in the first name', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'Password123!';
  this.firstName = generateValue('comment', 'security'); // <script>alert(1)</script>

  const registerPage = new RegisterPage(this.page);
  await registerPage.fill(registerPage.firstName, this.firstName);
  await registerPage.fill(registerPage.lastName, 'User');
  await registerPage.fill(registerPage.emailAddress, this.email);
  await registerPage.fill(registerPage.age, '25');
  await registerPage.select(registerPage.genderIdentity, 'Prefer not to say');
  await registerPage.fill(registerPage.accountPassword, this.password);
  await registerPage.fill(registerPage.confirmPassword, this.password);
  await registerPage.check(registerPage.acceptTerms);
  await registerPage.click(registerPage.createAccount);
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found. Did you register a new user in a previous step?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP code', async function (this: CustomWorld) {
  const otpPage = new OtpPage(this.page);
  await otpPage.enterOtp(requireEnv('APP_OTP'));
});
