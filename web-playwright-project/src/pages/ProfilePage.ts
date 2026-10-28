import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get accountMenuButton() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get dashboardLink() { return this.page.getByRole('link', { name: 'Dashboard' }); }

  async navigateToDashboard(): Promise<void> {
    await this.click(this.accountMenuButton);
    await this.click(this.dashboardLink);
  }
}
