import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name', exact: true }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name', exact: true }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address', exact: true }); }
  get mobileNumber() { return this.page.getByRole('textbox', { name: 'Mobile number', exact: true }); }
  get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)', exact: true }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity', exact: true }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password', exact: true }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password', exact: true }); }
  get termsAndConditions() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions', exact: true }); }
  get createAccount() { return this.page.getByRole('button', { name: 'Create account', exact: true }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login', exact: true }); }

  async register(details: {
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    age: string;
    gender: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
  }) {
    await this.fill(this.firstName, details.firstName);
    await this.fill(this.lastName, details.lastName);
    await this.fill(this.emailAddress, details.email);
    if (details.mobile) {
      await this.fill(this.mobileNumber, details.mobile);
    }
    await this.fill(this.age, details.age);
    await this.select(this.genderIdentity, details.gender);
    await this.fill(this.accountPassword, details.password);
    await this.fill(this.confirmPassword, details.confirmPassword);
    if (details.acceptTerms) {
      await this.check(this.termsAndConditions);
    }
    await this.click(this.createAccount);
  }
}