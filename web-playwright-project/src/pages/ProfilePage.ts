import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class ProfilePage extends BasePage {
  get accountMenu(): Locator { return this.page.getByRole('button', { name: 'Account menu' }); }
  get dashboardMenuItem(): Locator { return this.page.getByRole('menuitem', { name: 'Dashboard' }); }

  async openDashboard(): Promise<void> {
    await this.click(this.accountMenu);
    await this.click(this.dashboardMenuItem);
  }
}
