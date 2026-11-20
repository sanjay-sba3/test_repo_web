import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  get emailInput(): Locator { return this.page.getByRole('textbox', { name: 'Email' }); }
  get passwordInput(): Locator { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInButton(): Locator { return this.page.getByRole('button', { name: 'Sign in' }); }

  async login(email: string, pass: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, pass);
    await this.click(this.signInButton);
  }
}
