import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get mobileNumber() { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
  get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get termsCheckbox() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginButton() { return this.page.getByRole('link', { name: 'Go to Login' }); }
}