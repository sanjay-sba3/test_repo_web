import { BasePage } from './BasePage.js';
import { generateValue } from '../support/testDataGenerator.js';

export class RegisterPage extends BasePage {
  get firstName() { return this.page.getByRole('textbox', { name: 'First name', exact: true }); }
  get lastName() { return this.page.getByRole('textbox', { name: 'Last name', exact: true }); }
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email address', exact: true }); }
  get age() { return this.page.getByRole('spinbutton', { name: 'Age (years)', exact: true }); }
  get genderIdentity() { return this.page.getByRole('combobox', { name: 'Gender identity', exact: true }); }
  get accountPassword() { return this.page.getByRole('textbox', { name: 'Account password', exact: true }); }
  get confirmPassword() { return this.page.getByRole('textbox', { name: 'Confirm password', exact: true }); }
  get terms() { return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions', exact: true }); }
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account', exact: true }); }

  private async fillAllFields(email: string, pass: string, confirmPass: string, firstNameValue?: string) {
    await this.fill(this.firstName, firstNameValue ?? generateValue('firstName'));
    await this.fill(this.lastName, generateValue('lastName'));
    await this.fill(this.emailAddress, email);
    await this.fill(this.age, '30');
    await this.select(this.genderIdentity, 'Male');
    await this.fill(this.accountPassword, pass);
    await this.fill(this.confirmPassword, confirmPass);
    await this.check(this.terms);
  }

  async register(email: string, pass: string, confirmPass: string, submit: boolean = true, firstNameValue?: string): Promise<void> {
    await this.fillAllFields(email, pass, confirmPass, firstNameValue);
    if (submit) {
      await this.click(this.createAccountButton);
    }
  }

  async registerWithBlankField(fieldToSkip: string): Promise<void> {
    if (fieldToSkip !== 'Email address') await this.fill(this.emailAddress, generateValue('email'));
    if (fieldToSkip !== 'Account password') await this.fill(this.accountPassword, 'ValidPassword123!');
    await this.fill(this.firstName, generateValue('firstName'));
    await this.fill(this.lastName, generateValue('lastName'));
    await this.fill(this.age, '30');
    await this.select(this.genderIdentity, 'Male');
    await this.fill(this.confirmPassword, 'ValidPassword123!');
    await this.check(this.terms);
    await this.click(this.createAccountButton);
  }
}
