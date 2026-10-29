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
  get acceptTerms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login' }); }

  async register(email: string, password: string): Promise<void> {
    await this.fill(this.firstName, '{{random.firstName}}');
    await this.fill(this.lastName, '{{random.lastName}}');
    await this.fill(this.emailAddress, email);
    await this.fill(this.mobileNumber, '{{random.phone}}');
    await this.fill(this.age, '30');
    await this.genderIdentity.selectOption('Male');
    await this.fill(this.accountPassword, password);
    await this.fill(this.confirmPassword, password);
    await this.check(this.acceptTerms);
    await this.click(this.createAccountButton);
  }
}
