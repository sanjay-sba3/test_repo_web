import { When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { VerifyOtpPage } from '../pages/VerifyOtpPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const fillRegistrationForm = async (page: RegisterPage, email: string, password?: string) => {
  await page.fill(page.firstName, generateValue('firstName'));
  await page.fill(page.lastName, generateValue('lastName'));
  await page.fill(page.emailAddress, email);
  await page.fill(page.age, '25');
  await page.select(page.genderIdentity, 'Male');
  if (password) {
    await page.fill(page.accountPassword, password);
    await page.fill(page.confirmPassword, password);
  }
  await page.check(page.acceptTerms);
};

When('I register a new user', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  this.email = generateValue('email');
  this.password = 'ValidP@ssw0rd123!';

  await fillRegistrationForm(registerPage, this.email, this.password);
  await registerPage.click(registerPage.createAccountButton);
});

When('I attempt to register with an existing email', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  const existingEmail = requireEnv('APP_USERNAME');
  const password = 'ValidP@ssw0rd123!';

  await fillRegistrationForm(registerPage, existingEmail, password);
  await registerPage.click(registerPage.createAccountButton);
});

When('I attempt to register with an empty email field', async function (this: JourneyWorld) {
  const registerPage = new RegisterPage(this.page);
  const password = 'ValidP@ssw0rd123!';

  await registerPage.fill(registerPage.firstName, generateValue('firstName'));
  await registerPage.fill(registerPage.lastName, generateValue('lastName'));
  await registerPage.fill(registerPage.age, '25');
  await registerPage.select(registerPage.genderIdentity, 'Male');
  await registerPage.fill(registerPage.accountPassword, password);
  await registerPage.fill(registerPage.confirmPassword, password);
  await registerPage.check(registerPage.acceptTerms);

  await registerPage.click(registerPage.createAccountButton);
});

When('I sign in as the new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('New user credentials not found in world context. Did "I register a new user" run first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

When('I enter the OTP', async function (this: CustomWorld) {
  const verifyOtpPage = new VerifyOtpPage(this.page);
  await verifyOtpPage.submitOtp();
});

When('I navigate from dashboard to profile and back', async function (this: CustomWorld) {
  const dashboardPage = new DashboardPage(this.page);
  await dashboardPage.click(dashboardPage.viewProfileLink);
  await expect(this.page).toHaveURL(/.*\/profile/);

  const profilePage = new ProfilePage(this.page);
  await profilePage.click(profilePage.backToDashboardLink);
  await expect(this.page).toHaveURL(/.*\/dashboard/);
});

Then('I should see the {string} heading', async function (this: CustomWorld, name: string) {
  await expect(this.page.getByRole('heading', { name })).toBeVisible();
});
