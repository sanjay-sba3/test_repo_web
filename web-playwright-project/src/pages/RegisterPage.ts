import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
    get firstName(): Locator { return this.page.getByRole('textbox', { name: 'First name' }); }
    get lastName(): Locator { return this.page.getByRole('textbox', { name: 'Last name' }); }
    get emailAddress(): Locator { return this.page.getByRole('textbox', { name: 'Email address' }); }
    get mobileNumber(): Locator { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
    get age(): Locator { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
    get gender(): Locator { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
    get password(): Locator { return this.page.getByRole('textbox', { name: 'Account password' }); }
    get confirmPassword(): Locator { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
    get terms(): Locator { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
    get createAccountButton(): Locator { return this.page.getByRole('button', { name: 'Create account' }); }
    get goToLoginLink(): Locator { return this.page.getByRole('link', { name: 'Go to login' }); }

    async fillRegistrationForm(options: {
        firstName?: string;
        lastName?: string;
        email?: string;
        age?: string;
        gender?: string;
        password?: string;
        confirmPassword?: string;
        acceptTerms?: boolean;
        mobile?: string;
    }) {
        if (options.firstName) await this.fill(this.firstName, options.firstName);
        if (options.lastName) await this.fill(this.lastName, options.lastName);
        if (options.email) await this.fill(this.emailAddress, options.email);
        if (options.age) await this.fill(this.age, options.age);
        if (options.gender) await this.select(this.gender, options.gender);
        if (options.password) await this.fill(this.password, options.password);
        if (options.confirmPassword) await this.fill(this.confirmPassword, options.confirmPassword);
        if (options.acceptTerms) await this.check(this.terms);
        if (options.mobile) await this.fill(this.mobileNumber, options.mobile);
    }
}
