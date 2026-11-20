import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  get firstNameInput(): Locator { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastNameInput(): Locator { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddressInput(): Locator { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get ageInput(): Locator { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentitySelect(): Locator { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPasswordInput(): Locator { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPasswordInput(): Locator { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get termsCheckbox(): Locator { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton(): Locator { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink(): Locator { return this.page.getByRole('link', { name: 'Go to login' }); }
}
