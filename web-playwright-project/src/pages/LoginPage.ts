import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email Address' }); }
  get password() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInButton() { return this.page.getByRole('button', { name: 'Sign In with Email' }); }

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailAddress, email);
    await this.fill(this.password, password);
    await this.click(this.signInButton);
  }
}
