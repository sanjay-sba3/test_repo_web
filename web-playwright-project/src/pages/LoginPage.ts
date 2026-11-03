import { Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get usernameInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get passwordInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.usernameInput, user);
    await this.fill(this.passwordInput, pass);
    await this.click(this.loginButton);
  }
}
