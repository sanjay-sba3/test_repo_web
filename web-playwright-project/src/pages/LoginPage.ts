import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get emailAddress(): Locator {
    return this.page.getByRole('textbox', { name: 'Email Address' });
  }

  get password(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get signInWithEmailButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign In with Email' });
  }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.emailAddress, user);
    await this.fill(this.password, pass);
    await this.click(this.signInWithEmailButton);
    await this.page.waitForURL(url => !url.pathname.includes('/login'));
  }
}
