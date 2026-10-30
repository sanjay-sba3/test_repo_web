import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  get emailAddress() { return this.page.getByRole('textbox', { name: 'Email Address' }); }
  get password() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInWithEmail() { return this.page.getByRole('button', { name: 'Sign In with Email' }); }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.emailAddress, user);
    await this.fill(this.password, pass);
    await this.click(this.signInWithEmail);
    // Wait for navigation after login to prevent race conditions
    await this.page.waitForURL((url) => !url.pathname.includes('/login'));
  }
}