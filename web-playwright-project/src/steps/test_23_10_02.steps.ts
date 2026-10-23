import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { loadTestData } from '../support/testData.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyData = {
    email?: string;
    password?: string;
    firstName?: string;
};
type JourneyWorld = CustomWorld & { journeyData?: JourneyData };

const testData = await loadTestData<{
    password: string;
    wrongPassword: string;
    confirmPassword: string;
    existingUserEmail: string;
}>('test_23_10_02');

async function fillAllRequiredFields(page: RegisterPage, overrides: any = {}) {
    const data = {
        firstName: generateValue('firstName'),
        lastName: generateValue('lastName'),
        email: generateValue('email'),
        age: '25',
        gender: 'Female',
        password: testData.password,
        confirmPassword: testData.password,
        acceptTerms: true,
        ...overrides,
    };
    await page.fillRegistrationForm(data);
    return data;
}

When('I register a new user with valid details', async function (this: JourneyWorld) {
    this.journeyData = {};
    const registerPage = new RegisterPage(this.page);
    const formData = await fillAllRequiredFields(registerPage);
    this.journeyData.email = formData.email;
    this.journeyData.password = formData.password;
    await registerPage.submitRegistration();
});

When('I attempt to log in with the new user\'s credentials', async function (this: JourneyWorld) {
    if (!this.journeyData?.email || !this.journeyData?.password) {
        throw new Error('User credentials not found in world context. Did you register first?');
    }
    const loginPage = new LoginPage(this.page);
    await loginPage.login(this.journeyData.email, this.journeyData.password);
});

When('I navigate to the profile and back to the dashboard', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.viewProfileLink.click();
    await expect(this.page).toHaveURL(/.*\/profile/);
    const profilePage = new ProfilePage(this.page);
    await profilePage.backToDashboardLink.click();
});

When('I log out', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.logoutButton.click();
});

When('I attempt to register with an existing email', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillAllRequiredFields(registerPage, { email: testData.existingUserEmail });
    await registerPage.submitRegistration();
});

When('I attempt to register with an invalid email format', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillAllRequiredFields(registerPage, { email: '{{negative.email}}' });
    await registerPage.submitRegistration();
});

When('I attempt to register with all valid details except an empty email', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillAllRequiredFields(registerPage, { email: '' });
    await registerPage.submitRegistration();
});

When('I attempt to register with mismatching passwords', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    await fillAllRequiredFields(registerPage, { confirmPassword: testData.confirmPassword });
    await registerPage.submitRegistration();
});

When('I attempt to log in with the new user\'s email and an incorrect password', async function (this: JourneyWorld) {
    if (!this.journeyData?.email) {
        throw new Error('User email not found in world context. Did you register first?');
    }
    const loginPage = new LoginPage(this.page);
    await loginPage.login(this.journeyData.email, testData.wrongPassword);
});

When('I attempt to log in with a known user and an incorrect password', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(testData.existingUserEmail, testData.wrongPassword);
});

When('I attempt to log in with a valid user and an empty password', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(testData.existingUserEmail, '');
});

When('I register a user with an XSS payload in the first name', async function (this: JourneyWorld) {
    this.journeyData = {};
    const registerPage = new RegisterPage(this.page);
    const xssPayload = generateValue('comment', 'security');
    const formData = await fillAllRequiredFields(registerPage, { firstName: xssPayload });
    this.journeyData.email = formData.email;
    this.journeyData.password = formData.password;
    this.journeyData.firstName = xssPayload;
    await registerPage.submitRegistration();
});