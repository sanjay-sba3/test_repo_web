import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get accountMenuButton() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get profileMenuItem() { return this.page.getByRole('menuitem', { name: 'Profile' }); }
  get logoutMenuItem() { return this.page.getByRole('menuitem', { name: 'Logout' }); }

  async navigateToProfile(): Promise<void> {
    await this.click(this.accountMenuButton);
    await this.click(this.profileMenuItem);
  }

  async logout(): Promise<void> {
    await this.click(this.accountMenuButton);
    await this.click(this.logoutMenuItem);
  }
}
