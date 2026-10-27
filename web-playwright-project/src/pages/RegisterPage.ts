import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
  get createAccountButton() { return this.page.getByRole('button', { name: 'Create account' }); }
  get signInLink() { return this.page.getByRole('link', { name: 'Sign in' }); }

  async clickCreateAccount(): Promise<void> {
    await this.click(this.createAccountButton);
  }

  async clickSignIn(): Promise<void> {
    await this.click(this.signInLink);
  }
}
