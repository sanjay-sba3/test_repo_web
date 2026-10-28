import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get accountMenuButton() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get dashboardMenuItem() { return this.page.getByRole('menuitem', { name: 'Dashboard' }); }

  async navigateToDashboard(): Promise<void> {
    await this.click(this.accountMenuButton);
    await this.click(this.dashboardMenuItem);
  }
}
