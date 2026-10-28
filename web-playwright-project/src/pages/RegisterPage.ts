import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get acceptTerms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login' }); }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    gender: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms: boolean;
  }) {
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    if (data.email) await this.fill(this.emailAddress, data.email);
    await this.fill(this.age, data.age);
    await this.genderIdentity.selectOption(data.gender);
    if (data.password) await this.fill(this.accountPassword, data.password);
    if (data.confirmPassword) await this.fill(this.confirmPassword, data.confirmPassword);
    if (data.acceptTerms) await this.acceptTerms.check();
  }
}
