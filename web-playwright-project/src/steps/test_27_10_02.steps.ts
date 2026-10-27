import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { Page } from '@playwright/test';

type JourneyWorld = CustomWorld & {
    email?: string;
    password?: string;
};

const standardPassword = 'ValidPassword123!';

async function completeRegistration(page: Page, data: { [key: string]: string }) {
    const registerPage = new RegisterPage(page);
    await registerPage.fill('First name', data.firstName);
    await registerPage.fill('Last name', data.lastName);
    await registerPage.fill('Email address', data.email);
    await registerPage.fill('Age (years)', data.age);
    await registerPage.select('Gender identity', data.gender);
    await registerPage.fill('Account password', data.password);
    await registerPage.fill('Confirm password', data.confirmPassword);
    await registerPage.check('I accept the terms and conditions');
    await registerPage.click(registerPage.createAccountButton);
}

When('I create a user with email {string}', async function (this: JourneyWorld, email: string) {
    await completeRegistration(this.page, {
        firstName: 'Test', lastName: 'User', email: email, age: '30', gender: 'Male',
        password: standardPassword, confirmPassword: standardPassword
    });
    await expect(this.page.getByText('Registration successful')).toBeVisible();
});

When('I attempt to register with email {string}', async function (this: JourneyWorld, email: string) {
    await completeRegistration(this.page, {
        firstName: 'Another', lastName: 'User', email: email, age: '25', gender: 'Female',
        password: standardPassword, confirmPassword: standardPassword
    });
});

When('I register a new user with valid details', async function (this: JourneyWorld) {
    this.email = generateValue('email');
    this.password = standardPassword;
    await completeRegistration(this.page, {
        firstName: 'Test', lastName: 'User', email: this.email, age: '30', gender: 'Male',
        password: this.password, confirmPassword: this.password
    });
});

When('I create a user with the environment email', async function (this: JourneyWorld) {
    await completeRegistration(this.page, {
        firstName: 'Test', lastName: 'User', email: this.config.username, age: '30', gender: 'Male',
        password: standardPassword, confirmPassword: standardPassword
    });
    await expect(this.page.getByText('Registration successful')).toBeVisible();
});

When('I attempt to register with the environment email', async function (this: JourneyWorld) {
    await completeRegistration(this.page, {
        firstName: 'Another', lastName: 'User', email: this.config.username, age: '25', gender: 'Female',
        password: standardPassword, confirmPassword: standardPassword
    });
});

When('I attempt to register with mismatched passwords', async function (this: JourneyWorld) {
    await completeRegistration(this.page, {
        firstName: 'Test', lastName: 'User', email: generateValue('email'), age: '30', gender: 'Male',
        password: standardPassword, confirmPassword: 'DifferentPassword456!'
    });
});

Then('I should see the {string} link', async function (this: CustomWorld, linkName: string) {
    await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
});

When('I log in as the newly registered user', async function (this: JourneyWorld) {
    const loginPage = new LoginPage(this.page);
    if (!this.email || !this.password) {
        throw new Error('User credentials not found in world object. Was a user registered in this scenario?');
    }
    await loginPage.login(this.email, this.password);
});

When('I attempt to log in as the newly registered user with a wrong password', async function (this: JourneyWorld) {
    const loginPage = new LoginPage(this.page);
    if (!this.email) {
        throw new Error('User email not found in world object. Was a user registered in this scenario?');
    }
    await loginPage.login(this.email, 'a-very-wrong-password');
});

When('I navigate from the dashboard to the profile page and back', async function (this: CustomWorld) {
    const dashboardPage = new DashboardPage(this.page);
    await dashboardPage.viewProfile();
    await expect(this.page).toHaveURL(/.*\/profile/);
    const profilePage = new ProfilePage(this.page);
    await profilePage.backToDashboard();
    await expect(this.page).toHaveURL(/.*\/dashboard/);
});
