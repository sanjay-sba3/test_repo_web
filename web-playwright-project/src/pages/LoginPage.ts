import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email Address', exact: true }); }
  get password() { return this.page.getByRole('textbox', { name: 'Password', exact: true }); }
  get signInWithEmail() { return this.page.getByRole('button', { name: 'Sign In with Email', exact: true }); }

  async login(email: string, pass: string): Promise<void> {
    await this.fill(this.emailAddress, email);
    await this.fill(this.password, pass);
    await this.click(this.signInWithEmail);
  }
}
