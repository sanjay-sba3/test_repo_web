import { BasePage } from './BasePage.js';
import { Page } from '@playwright/test';

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get viewProfileLink() {
    return this.page.getByRole('link', { name: 'View profile →' });
  }

  get logoutButton() {
    return this.page.getByRole('button', { name: 'Logout' });
  }

  async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }
}
