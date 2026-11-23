import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

async function fillAllRegistrationFields(world: CustomWorld, overrides: { email?: string; age?: string } = {}) {
    const registerPage = new RegisterPage(world.page);
    await registerPage.fillFirstName('{{random.firstName}}');
    await registerPage.fillLastName('{{random.lastName}}');
    await registerPage.fillEmail(overrides.email || '{{random.email}}');
    await registerPage.fillAccountPassword('ValidP@ssword123');
    await registerPage.fillConfirmPassword('ValidP@ssword123');
    await registerPage.fillAge(overrides.age || '30');
    await registerPage.selectGender('Male');
    await registerPage.checkTerms();
}

When('I fill all registration fields with valid data but with email {string}', async function (this: CustomWorld, email: string) {
    await fillAllRegistrationFields(this, { email });
});

When('I fill all registration fields with valid data but with age {string}', async function (this: CustomWorld, age: string) {
    await fillAllRegistrationFields(this, { age });
});

When('I register a new user for the E2E test', async function (this: JourneyWorld) {
    this.email = generateValue('email');
    this.password = 'ValidPassword123!';
    const registerPage = new RegisterPage(this.page);
    await registerPage.fillFirstName('Test');
    await registerPage.fillLastName('User');
    await registerPage.fillEmail(this.email);
    await registerPage.fillAccountPassword(this.password);
    await registerPage.fillConfirmPassword(this.password);
    await registerPage.fillAge('25');
    await registerPage.selectGender('Prefer not to say');
    await registerPage.checkTerms();
    await registerPage.clickCreateAccount();
});

When('I register a new user with a mobile number for the E2E test', async function (this: JourneyWorld) {
    this.email = generateValue('email');
    this.password = 'ValidPassword123!';
    const registerPage = new RegisterPage(this.page);
    await registerPage.fillFirstName('Test');
    await registerPage.fillLastName('User');
    await registerPage.fillEmail(this.email);
    await registerPage.fillMobileNumber('+15551234567');
    await registerPage.fillAccountPassword(this.password);
    await registerPage.fillConfirmPassword(this.password);
    await registerPage.fillAge('30');
    await registerPage.selectGender('Male');
    await registerPage.checkTerms();
    await registerPage.clickCreateAccount();
});

async function loginAndEnterOtp(world: JourneyWorld, rememberMe: boolean) {
    if (!world.email || !world.password) {
        throw new Error('User credentials not found in world context.');
    }
    const loginPage = new LoginPage(world.page);
    await loginPage.login(world.email, world.password, rememberMe);
    await world.page.waitForURL(/\/otp/);
    const otpPage = new OtpPage(world.page);
    await otpPage.enterOtp(requireEnv('APP_OTP'));
}

When('I log in as the new user', async function (this: JourneyWorld) {
    await loginAndEnterOtp(this, false);
});

When('I log in as the new user with {string} checked', async function (this: JourneyWorld, label: string) {
    if (label !== 'Remember my email') throw new Error(`Unsupported checkbox: ${label}`);
    await loginAndEnterOtp(this, true);
});

Then('the {string} field should contain the new user\'s email', async function (this: JourneyWorld, label: string) {
    if (!this.email) {
        throw new Error('User email not found in world context.');
    }
    const loginPage = new LoginPage(this.page);
    await expect(loginPage.email).toHaveValue(this.email);
});

// This step is for the @needs-review scenario
When('I click the {string} button', async function (this: CustomWorld, name: string) {
  await this.page.getByRole('button', { name }).click();
});
