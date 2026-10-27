import { BasePage } from './BasePage.js';

export interface RegistrationDetails {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber?: string;
  age?: string;
  gender?: string;
  accountPassword?: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get mobileNumber() { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
  get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get acceptTerms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }

  async register(details: RegistrationDetails): Promise<void> {
    if (details.firstName) await this.fill(this.firstName, details.firstName);
    if (details.lastName) await this.fill(this.lastName, details.lastName);
    if (details.emailAddress) await this.fill(this.emailAddress, details.emailAddress);
    if (details.mobileNumber) await this.fill(this.mobileNumber, details.mobileNumber);
    if (details.age) await this.fill(this.age, details.age);
    if (details.gender) await this.select(this.genderIdentity, details.gender);
    if (details.accountPassword) await this.fill(this.accountPassword, details.accountPassword);
    if (details.confirmPassword) await this.fill(this.confirmPassword, details.confirmPassword);
    if (details.acceptTerms) await this.check(this.acceptTerms);
    await this.click(this.createAccountButton);
  }
}
