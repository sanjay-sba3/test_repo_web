import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  get emailAddress(): Locator { return this.page.getByRole('textbox', { name: 'Email Address' }); }
  get password(): Locator { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInWithEmail(): Locator { return this.page.getByRole('button', { name: 'Sign In with Email' }); }
  get loginLink(): Locator { return this.page.getByRole('link', { name: 'Login' }); }

  async login(email: string, pass: string): Promise<void> {
    await this.fill(this.emailAddress, email);
    await this.fill(this.password, pass);
    await this.click(this.signInWithEmail);
    await this.page.waitForURL(url => !url.pathname.includes('/login'));
  }
}
