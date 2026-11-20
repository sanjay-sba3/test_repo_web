import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class DashboardPage extends BasePage {
  get viewProfileLink(): Locator {
    return this.page.getByRole('link', { name: 'View profile →' });
  }

  get logoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Logout' });
  }

  async viewProfile(): Promise<void> {
    await this.click(this.viewProfileLink);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }
}
