import { BasePage } from './BasePage.js';
import { Page, Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  get firstName(): Locator { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName(): Locator { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress(): Locator { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get mobileNumber(): Locator { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
  get age(): Locator { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity(): Locator { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword(): Locator { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword(): Locator { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get acceptTerms(): Locator { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton(): Locator { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink(): Locator { return this.page.getByRole('link', { name: 'Go to login' }); }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    age: string;
    gender: string;
    password: string;
  }): Promise<void> {
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    await this.fill(this.emailAddress, data.email);
    if (data.mobile) {
      await this.fill(this.mobileNumber, data.mobile);
    }
    await this.fill(this.age, data.age);
    await this.select(this.genderIdentity, data.gender);
    await this.fill(this.accountPassword, data.password);
    await this.fill(this.confirmPassword, data.password);
    await this.check(this.acceptTerms);
  }

  async submitRegistration(): Promise<void> {
    await this.click(this.createAccountButton);
  }
}
