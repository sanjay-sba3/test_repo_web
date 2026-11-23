import { BasePage } from './BasePage.js';
import { resolveTokens } from '../support/testDataGenerator.js';

export class RegisterPage extends BasePage {
    get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
    get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
    get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
    get mobileNumber() { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
    get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
    get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
    get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
    get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
    get acceptTerms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
    get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }

    async fillFirstName(value: string) { await this.fill(this.firstName, resolveTokens(value)); }
    async fillLastName(value: string) { await this.fill(this.lastName, resolveTokens(value)); }
    async fillEmail(value: string) { await this.fill(this.emailAddress, resolveTokens(value)); }
    async fillMobileNumber(value: string) { await this.fill(this.mobileNumber, resolveTokens(value)); }
    async fillAge(value: string) { await this.fill(this.age, resolveTokens(value)); }
    async selectGender(option: string) { await this.select(this.genderIdentity, option); }
    async fillAccountPassword(value: string) { await this.fill(this.accountPassword, value); }
    async fillConfirmPassword(value: string) { await this.fill(this.confirmPassword, value); }
    async checkTerms() { await this.check(this.acceptTerms); }
    async clickCreateAccount() { await this.click(this.createAccountButton); }
}
