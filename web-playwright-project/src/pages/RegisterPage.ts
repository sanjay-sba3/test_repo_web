import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  get firstName(): Locator { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName(): Locator { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress(): Locator { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get mobileNumber(): Locator { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
  get ageYears(): Locator { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity(): Locator { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword(): Locator { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword(): Locator { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get acceptTerms(): Locator { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton(): Locator { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink(): Locator { return this.page.getByRole('link', { name: 'Go to login' }); }
}
