import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get termsCheckbox() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login' }); }

  async fillFirstName(value: string) { await this.fill(this.firstName, value); }
  async fillLastName(value: string) { await this.fill(this.lastName, value); }
  async fillEmailAddress(value: string) { await this.fill(this.emailAddress, value); }
  async fillAge(value: string) { await this.fill(this.age, value); }
  async selectGender(option: string) { await this.genderIdentity.selectOption(option); }
  async fillAccountPassword(value: string) { await this.fill(this.accountPassword, value); }
  async fillConfirmPassword(value: string) { await this.fill(this.confirmPassword, value); }
  async checkTerms() { await this.check(this.termsCheckbox); }
  async clickCreateAccount() { await this.click(this.createAccountButton); }
}