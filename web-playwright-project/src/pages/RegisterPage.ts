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
  get terms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions', exact: true }); }
  get createAccount() { return this.page.getByRole('button', { name: 'Create account', exact: true }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to Login', exact: true }); }

  async fillAndSubmitRegistrationForm(data: {
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    mobileNumber?: string;
    age?: string;
    gender?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: boolean;
  }) {
    if (data.firstName) await this.fill(this.firstName, data.firstName);
    if (data.lastName) await this.fill(this.lastName, data.lastName);
    if (data.emailAddress) await this.fill(this.emailAddress, data.emailAddress);
    if (data.mobileNumber) await this.fill(this.mobileNumber, data.mobileNumber);
    if (data.age) await this.fill(this.age, data.age);
    if (data.gender) await this.select(this.genderIdentity, data.gender);
    if (data.password) await this.fill(this.accountPassword, data.password);
    if (data.confirmPassword) await this.fill(this.confirmPassword, data.confirmPassword);
    if (data.acceptTerms) await this.check(this.terms);
    
    await this.click(this.createAccount);
  }
}
