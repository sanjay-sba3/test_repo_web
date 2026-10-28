import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get accountMenuButton() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get profileMenuItem() { return this.page.getByRole('menuitem', { name: 'Profile' }); }
  get dashboardMenuItem() { return this.page.getByRole('menuitem', { name: 'Dashboard' }); }
  get logoutMenuItem() { return this.page.getByRole('menuitem', { name: 'Logout' }); }

  async openAccountMenu(): Promise<void> {
    await this.click(this.accountMenuButton);
  }

  async navigateToProfile(): Promise<void> {
    await this.openAccountMenu();
    await this.click(this.profileMenuItem);
  }

  async navigateToDashboard(): Promise<void> {
    await this.openAccountMenu();
    await this.click(this.dashboardMenuItem);
  }

  async logout(): Promise<void> {
    await this.openAccountMenu();
    await this.click(this.logoutMenuItem);
  }
}
