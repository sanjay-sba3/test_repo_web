import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  get fullName(): Locator { return this.page.getByRole('textbox', { name: 'Full Name' }); }
  get emailAddress(): Locator { return this.page.getByRole('textbox', { name: 'Email Address' }); }
  get password(): Locator { return this.page.getByRole('textbox', { name: 'Password' }); }
  get confirmPassword(): Locator { return this.page.getByRole('textbox', { name: 'Confirm Password' }); }
  get terms(): Locator { return this.page.getByRole('checkbox', { name: 'By signing up, you accept the Terms and Conditions on this page and our Privacy Policy.' }); }
  get signUpWithEmail(): Locator { return this.page.getByRole('button', { name: 'Sign Up with Email' }); }

  async register(name: string, email: string, pass: string): Promise<void> {
    await this.fill(this.fullName, name);
    await this.fill(this.emailAddress, email);
    await this.fill(this.password, pass);
    await this.fill(this.confirmPassword, pass);
    await this.check(this.terms);
    await this.click(this.signUpWithEmail);
  }
}
