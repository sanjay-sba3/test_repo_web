import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get accountMenuButton() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get profileLink() { return this.page.getByRole('link', { name: 'Profile' }); }
  get logoutLink() { return this.page.getByRole('link', { name: 'Logout' }); }

  async navigateToProfile(): Promise<void> {
    await this.click(this.accountMenuButton);
    await this.click(this.profileLink);
  }

  async logout(): Promise<void> {
    await this.click(this.accountMenuButton);
    await this.click(this.logoutLink);
  }
}
