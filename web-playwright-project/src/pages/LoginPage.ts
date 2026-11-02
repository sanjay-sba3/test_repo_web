import { BasePage } from './BasePage.js';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  get emailAddress() {
    return this.page.getByRole('textbox', { name: 'Email Address' });
  }

  get password() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get signInWithEmailButton() {
    return this.page.getByRole('button', { name: 'Sign In with Email' });
  }

  get loginLink() {
    return this.page.getByRole('link', { name: 'Login' });
  }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.emailAddress, user);
    await this.fill(this.password, pass);
    await this.click(this.signInWithEmailButton);
    await this.page.waitForURL((url) => !url.pathname.startsWith('/login'));
  }
}
