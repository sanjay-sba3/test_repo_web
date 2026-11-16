import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  get firstName(): Locator { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName(): Locator { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress(): Locator { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get age(): Locator { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get gender(): Locator { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get password(): Locator { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword(): Locator { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get terms(): Locator { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton(): Locator { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink(): Locator { return this.page.getByRole('link', { name: 'Go to login' }); }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    age: string,
    gender: string,
    pass: string
  ): Promise<void> {
    await this.fill(this.firstName, firstName);
    await this.fill(this.lastName, lastName);
    await this.fill(this.emailAddress, email);
    await this.fill(this.age, age);
    await this.select(this.gender, gender);
    await this.fill(this.password, pass);
    await this.fill(this.confirmPassword, pass);
    await this.check(this.terms);
    await this.click(this.createAccountButton);
  }
}
