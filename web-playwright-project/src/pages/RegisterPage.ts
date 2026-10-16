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
  get termsCheckbox() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions', exact: true }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account', exact: true }); }

  async fillFirstName(value: string) { await this.fill(this.firstName, value); }
  async fillLastName(value: string) { await this.fill(this.lastName, value); }
  async fillEmail(value: string) { await this.fill(this.emailAddress, value); }
  async fillMobileNumber(value: string) { await this.fill(this.mobileNumber, value); }
  async fillAge(value: string) { await this.fill(this.age, value); }
  async selectGender(option: string) { await this.select(this.genderIdentity, option); }
  async fillPassword(value: string) { await this.fill(this.accountPassword, value); }
  async fillConfirmPassword(value: string) { await this.fill(this.confirmPassword, value); }
  async checkTerms() { await this.check(this.termsCheckbox); }
  async clickCreateAccount() { await this.click(this.createAccountButton); }
}