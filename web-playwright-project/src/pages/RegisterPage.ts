import { BasePage } from './BasePage.js';

interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  password: string;
  confirmPassword: string;
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
  get age() {
    return this.page.getByRole('spinbutton', { name: 'Age (years)' });
  }
  get gender() {
    return this.page.getByRole('combobox', { name: 'Gender identity' });
  }
  get password() {
    return this.page.getByRole('textbox', { name: 'Account password' });
  }
  get confirmPassword() {
    return this.page.getByRole('textbox', { name: 'Confirm password' });
  }
  get terms() {
    return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' });
  }
  get createAccount() {
    return this.page.getByRole('button', { name: 'Create account' });
  }
  get goToLoginLink() {
    return this.page.getByRole('link', { name: 'Go to login' });
  }

  async fillRegistrationForm(data: RegistrationForm): Promise<void> {
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    if (data.email) {
      await this.fill(this.emailAddress, data.email);
    }
    await this.fill(this.age, data.age);
    await this.select(this.gender, data.gender);
    await this.fill(this.password, data.password);
    await this.fill(this.confirmPassword, data.confirmPassword);
    await this.check(this.terms);
  }
}
