import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class DashboardPage extends BasePage {
  get accountMenu(): Locator { return this.page.getByRole('button', { name: 'Account menu' }); }
  get profileMenuItem(): Locator { return this.page.getByRole('menuitem', { name: 'Profile' }); }
  get logoutMenuItem(): Locator { return this.page.getByRole('menuitem', { name: 'Logout' }); }

  async openProfile(): Promise<void> {
    await this.click(this.accountMenu);
    await this.click(this.profileMenuItem);
  }

  async logout(): Promise<void> {
    await this.click(this.accountMenu);
    await this.click(this.logoutMenuItem);
  }
}
