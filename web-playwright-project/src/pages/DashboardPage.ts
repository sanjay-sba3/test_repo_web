import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class DashboardPage extends BasePage {
  get profileLink(): Locator {
    return this.page.getByRole('link', { name: 'View profile →' });
  }
  get logoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Logout' });
  }
}
