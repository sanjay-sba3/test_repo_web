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

  async login(username: string, password_param: string): Promise<void> {
    if (username) {
      await this.fill(this.usernameInput, username);
    }
    if (password_param) {
      await this.fill(this.passwordInput, password_param);
    }
    await this.click(this.loginButton);
  }
}
