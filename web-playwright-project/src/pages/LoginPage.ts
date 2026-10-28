import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get emailAddressInput() { return this.page.getByRole('textbox', { name: 'Email Address' }); }
  get passwordInput() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInButton() { return this.page.getByRole('button', { name: 'Sign In with Email' }); }

  async login(email: string, pass: string): Promise<void> {
    await this.fill(this.emailAddressInput, email);
    await this.fill(this.passwordInput, pass);
    await this.click(this.signInButton);
  }
}
