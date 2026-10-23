import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get email() { return this.page.getByRole('textbox', { name: 'Email' }); }
  get password() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInButton() { return this.page.getByRole('button', { name: 'Sign in' }); }

  async login(user: string, pass: string): Promise<void> {
    await this.email.fill(user);
    await this.password.fill(pass);
    await this.signInButton.click();
  }
}