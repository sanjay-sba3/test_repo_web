import { BasePage } from './BasePage.js';

interface RegistrationDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  age: string;
  gender: string;
  password: string;
}

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name' }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address' }); }
  get mobileNumber() { return this.page.getByRole('textbox', { name: 'Mobile number' }); }
  get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)' }); }
  get gender() { return this.page.getByRole('combobox', { name: 'Gender identity' }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password' }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password' }); }
  get acceptTerms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login' }); }

  async register(details: RegistrationDetails): Promise<void> {
    await this.fill(this.firstName, details.firstName);
    await this.fill(this.lastName, details.lastName);
    await this.fill(this.emailAddress, details.email);
    if (details.mobile) {
      await this.fill(this.mobileNumber, details.mobile);
    }
    await this.fill(this.age, details.age);
    await this.select(this.gender, details.gender);
    await this.fill(this.accountPassword, details.password);
    await this.fill(this.confirmPassword, details.password);
    await this.check(this.acceptTerms);
    await this.click(this.createAccountButton);
  }
}
