import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get username(): Locator {
    return this.page.getByRole('textbox', { name: 'Username' });
  }

  get password(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.username, user);
    await this.fill(this.password, pass);
    await this.click(this.loginButton);
  }
}
