import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData<{ password: string }>('test_29_10_01');

async function fillAllRequiredFields(page: RegisterPage, options: { email?: string; password?: string; confirmPassword?: string }) {
    await page.fillRegistrationForm({
        firstName: generateValue('firstName'),
        lastName: generateValue('lastName'),
        email: options.email,
        age: '25',
        gender: 'Female',
        password: options.password,
        confirmPassword: options.confirmPassword,
        acceptTerms: true
    });
}

When('I successfully register a new user', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const password = testData.password;
    await fillAllRequiredFields(registerPage, {
        email: generateValue('email'),
        password: password,
        confirmPassword: password
    });
    await registerPage.createAccountButton.click();
});

When('I attempt to register with an existing email', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const password = testData.password;
    await fillAllRequiredFields(registerPage, {
        email: config.username,
        password: password,
        confirmPassword: password
    });
    await registerPage.createAccountButton.click();
});

When('I register with all valid details except for an empty email', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const password = testData.password;
    await fillAllRequiredFields(registerPage, {
        password: password,
        confirmPassword: password
    });
    await registerPage.createAccountButton.click();
});

When('I register with all valid details except for an empty password', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillAllRequiredFields(registerPage, {
        email: generateValue('email')
    });
    await registerPage.createAccountButton.click();
});

When('I register a new user for the E2E journey', async function (this: JourneyWorld) {
    const registerPage = new RegisterPage(this.page);
    this.email = generateValue('email');
    this.password = testData.password;
    await fillAllRequiredFields(registerPage, {
        email: this.email,
        password: this.password,
        confirmPassword: this.password
    });
    await registerPage.createAccountButton.click();
});

When('I sign in as the new user', async function (this: JourneyWorld) {
    if (!this.email || !this.password) {
        throw new Error('User credentials not found in world context. Did you register first?');
    }
    const loginPage = new LoginPage(this.page);
    await loginPage.login(this.email, this.password);
});

Then('I should see the {string} link', async function (this: CustomWorld, linkName: string) {
    await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
});
