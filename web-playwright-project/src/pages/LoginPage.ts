import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  // - textbox "Email"
  get email() { return this.page.getByRole('textbox', { name: 'Email', exact: true }); }
  // - textbox "Password"
  get password() { return this.page.getByRole('textbox', { name: 'Password', exact: true }); }
  // - button "Sign in"
  get signInButton() { return this.page.getByRole('button', { name: 'Sign in', exact: true }); }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.email, user);
    await this.fill(this.password, pass);
    await this.click(this.signInButton);
  }
}
