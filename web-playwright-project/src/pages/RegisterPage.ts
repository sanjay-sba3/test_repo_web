import { BasePage } from './BasePage.js';
import { generateValue } from '../support/testDataGenerator.js';

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get mobileNumber() { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
  get ageYears() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get acceptTerms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }

  async register(email: string, password: string): Promise<void> {
    await this.fill(this.firstName, generateValue('firstName'));
    await this.fill(this.lastName, generateValue('lastName'));
    await this.fill(this.emailAddress, email);
    await this.fill(this.ageYears, '30');
    await this.select(this.genderIdentity, 'Male');
    await this.fill(this.accountPassword, password);
    await this.fill(this.confirmPassword, password);
    await this.check(this.acceptTerms);
    await this.click(this.createAccountButton);
  }
}
