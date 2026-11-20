import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { requireEnv } from '../support/config.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { OtpPage } from '../pages/OtpPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

async function fillCommonRegistrationFields(registerPage: RegisterPage, options: { skip?: string[] } = {}) {
    const password = 'ValidPassword123!';
    if (!options.skip?.includes('First name')) await registerPage.firstName.fill('Test');
    if (!options.skip?.includes('Last name')) await registerPage.lastName.fill('User');
    if (!options.skip?.includes('Email address')) await registerPage.emailAddress.fill(generateValue('email'));
    if (!options.skip?.includes('Age (years)')) await registerPage.ageYears.fill('30');
    if (!options.skip?.includes('Gender identity')) await registerPage.genderIdentity.selectOption('Male');
    if (!options.skip?.includes('Account password')) await registerPage.accountPassword.fill(password);
    if (!options.skip?.includes('Confirm password')) await registerPage.confirmPassword.fill(password);
    if (!options.skip?.includes('I accept the terms and conditions')) await registerPage.acceptTerms.check();
}

When('I register with valid and unique data', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillCommonRegistrationFields(registerPage);
    await registerPage.createAccountButton.click();
});

When('I attempt to register with an existing email', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillCommonRegistrationFields(registerPage, { skip: ['Email address'] });
    await registerPage.emailAddress.fill('test@test.com');
});

When('I register a new user', async function (this: JourneyWorld) {
    const registerPage = new RegisterPage(this.page);
    this.email = generateValue('email');
    this.password = 'ValidPassword123!';

    await registerPage.firstName.fill('John');
    await registerPage.lastName.fill('Doe');
    await registerPage.emailAddress.fill(this.email);
    await registerPage.ageYears.fill('30');
    await registerPage.genderIdentity.selectOption('Male');
    await registerPage.accountPassword.fill(this.password);
    await registerPage.confirmPassword.fill(this.password);
    await registerPage.acceptTerms.check();
    await registerPage.createAccountButton.click();
});

When('I log in as the new user', async function (this: JourneyWorld) {
    if (!this.email || !this.password) {
        throw new Error('User credentials not found. Did you register a new user in a previous step?');
    }
    const loginPage = new LoginPage(this.page);
    await loginPage.login(this.email, this.password);
});

When('I enter the OTP from the environment', async function (this: CustomWorld) {
    const otpPage = new OtpPage(this.page);
    await otpPage.enterOtp(requireEnv('APP_OTP'));
});

When('I fill the registration form leaving First and Last Name empty', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillCommonRegistrationFields(registerPage, { skip: ['First name', 'Last name'] });
});

When('I fill the registration form leaving Email Address empty', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillCommonRegistrationFields(registerPage, { skip: ['Email address'] });
});

When('I fill the registration form leaving Password empty', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillCommonRegistrationFields(registerPage, { skip: ['Account password', 'Confirm password'] });
});

When('I fill the registration form leaving Accept Terms unchecked', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillCommonRegistrationFields(registerPage, { skip: ['I accept the terms and conditions'] });
});

When('I fill the registration form leaving Age empty', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillCommonRegistrationFields(registerPage, { skip: ['Age (years)'] });
});
