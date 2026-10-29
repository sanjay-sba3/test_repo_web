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
  get terms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' }); }
  get createAccount() { return this.page.getByRole('button', { name: 'Create account' }); }
  get goToLoginLink() { return this.page.getByRole('link', { name: 'Go to login' }); }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    mobile: string,
    age: string,
    gender: string,
    pass: string,
    confirmPass: string
  ): Promise<void> {
    await this.fill(this.firstName, firstName);
    await this.fill(this.lastName, lastName);
    await this.fill(this.emailAddress, email);
    await this.fill(this.mobileNumber, mobile);
    await this.fill(this.age, age);
    await this.select(this.genderIdentity, gender);
    await this.fill(this.accountPassword, pass);
    await this.fill(this.confirmPassword, confirmPass);
    await this.check(this.terms);
    await this.click(this.createAccount);
  }
}
