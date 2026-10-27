import { When, Then, Before } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { loadTestData } from '../support/testData.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };

const testData = loadTestData('test_27_10_01');

async function fillAndSubmitRegistrationForm(page: RegisterPage, data: any) {
    if (data.firstName !== undefined) await page.fill('First name', data.firstName);
    if (data.lastName !== undefined) await page.fill('Last name', data.lastName);
    if (data.email !== undefined) await page.fill('Email address', data.email);
    if (data.mobile !== undefined) await page.fill('Mobile number', data.mobile);
    if (data.age !== undefined) await page.fill('Age (years)', data.age);
    if (data.gender !== undefined) await page.select('Gender identity', data.gender);
    if (data.password !== undefined) await page.fill('Account password', data.password);
    if (data.confirmPassword !== undefined) await page.fill('Confirm password', data.confirmPassword);
    if (data.acceptTerms) await page.check('I accept the terms and conditions');
    await page.clickCreateAccount();
}

const getValidRegistrationData = (world: JourneyWorld) => {
    world.email = generateValue('email');
    world.password = testData.password;
    return {
        firstName: generateValue('firstName'),
        lastName: generateValue('lastName'),
        email: world.email,
        mobile: '5551234567',
        age: '30',
        gender: 'Other',
        password: world.password,
        confirmPassword: world.password,
        acceptTerms: true,
    };
};

When('I register a new user with valid details', async function (this: JourneyWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData(this);
    await fillAndSubmitRegistrationForm(registerPage, data);
});

When('I sign in as the new user', async function (this: JourneyWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.open('http://localhost:3000/login');
    if (!this.email || !this.password) {
        throw new Error('User credentials not found in world object');
    }
    await loginPage.login(this.email, this.password);
});

When('I navigate from the dashboard to the profile page and back', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.viewProfile();
    await expect(this.page).toHaveURL(/.*\/profile/);
    const profilePage = new ProfilePage(this.page);
    await profilePage.backToDashboard();
});

When('I attempt to register with an existing email', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData({} as JourneyWorld);
    data.email = testData.existingEmail;
    await fillAndSubmitRegistrationForm(registerPage, data);
});

When('I attempt to register with an empty first name', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData({} as JourneyWorld);
    data.firstName = '';
    await fillAndSubmitRegistrationForm(registerPage, data);
});

When('I attempt to register with mismatched passwords', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData({} as JourneyWorld);
    data.confirmPassword = 'MismatchedPassword123!';
    await fillAndSubmitRegistrationForm(registerPage, data);
});

When('I attempt to register with a password shorter than 6 characters', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData({} as JourneyWorld);
    data.password = 'short';
    data.confirmPassword = 'short';
    await fillAndSubmitRegistrationForm(registerPage, data);
});

When('I attempt to register without accepting terms', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData({} as JourneyWorld);
    data.acceptTerms = false;
    await fillAndSubmitRegistrationForm(registerPage, data);
});

When('I attempt to register with an invalid email format', async function (this: CustomWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData({} as JourneyWorld);
    data.email = 'invalid-email';
    await fillAndSubmitRegistrationForm(registerPage, data);
});

When('I register a new user with an XSS payload in the first name', async function (this: JourneyWorld) {
    const registerPage = new RegisterPage(this.page);
    const data = getValidRegistrationData(this);
    data.firstName = '{{security.firstName}}';
    await fillAndSubmitRegistrationForm(registerPage, data);
});
