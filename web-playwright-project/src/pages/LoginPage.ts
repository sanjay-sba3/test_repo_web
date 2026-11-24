import { BasePage } from './BasePage.js';
import { Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  get email() {
    return this.page.getByRole('textbox', { name: 'Email' });
  }
  get password() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }
  get signInButton() {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  async login(email: string, pass: string): Promise<void> {
    await this.fill(this.email, email);
    await this.fill(this.password, pass);
    await this.click(this.signInButton);
  }
}
