import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get accountMenu() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get dashboardLink() { return this.page.getByRole('link', { name: 'Dashboard' }); }
  get logoutButton() { return this.page.getByRole('button', { name: 'Log out' }); }

  async navigateToDashboard(): Promise<void> {
    await this.click(this.accountMenu);
    await this.click(this.dashboardLink);
  }
}
