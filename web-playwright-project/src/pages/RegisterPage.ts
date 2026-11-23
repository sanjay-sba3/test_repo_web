import { BasePage } from './BasePage.js';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  age: string;
  gender: string;
  password: string;
}

export class RegisterPage extends BasePage {
  get firstName() {
    return this.page.getByRole('textbox', { name: 'First name' });
  }
  get lastName() {
    return this.page.getByRole('textbox', { name: 'Last name' });
  }
  get emailAddress() {
    return this.page.getByRole('textbox', { name: 'Email address' });
  }
  get mobileNumber() {
    return this.page.getByRole('textbox', { name: 'Mobile number' });
  }
  get ageYears() {
    return this.page.getByRole('spinbutton', { name: 'Age (years)' });
  }
  get genderIdentity() {
    return this.page.getByRole('combobox', { name: 'Gender identity' });
  }
  get accountPassword() {
    return this.page.getByRole('textbox', { name: 'Account password' });
  }
  get confirmPassword() {
    return this.page.getByRole('textbox', { name: 'Confirm password' });
  }
  get acceptTerms() {
    return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' });
  }
  get createAccount() {
    return this.page.getByRole('button', { name: 'Create account' });
  }

  async open(): Promise<void> {
    await super.open('http://localhost:3000/register');
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    await this.fill(this.emailAddress, data.email);
    if (data.mobileNumber) {
      await this.fill(this.mobileNumber, data.mobileNumber);
    }
    await this.fill(this.ageYears, data.age);
    await this.select(this.genderIdentity, data.gender);
    await this.fill(this.accountPassword, data.password);
    await this.fill(this.confirmPassword, data.password);
    await this.check(this.acceptTerms);
    await this.click(this.createAccount);
  }
}
