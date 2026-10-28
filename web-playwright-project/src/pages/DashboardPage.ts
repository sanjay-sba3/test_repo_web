import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get accountMenu() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get profileLink() { return this.page.getByRole('link', { name: 'Profile' }); }
  get logoutLink() { return this.page.getByRole('link', { name: 'Logout' }); }

  async navigateToProfile(): Promise<void> {
    await this.click(this.accountMenu);
    await this.click(this.profileLink);
  }

  async logoutFromMenu(): Promise<void> {
    await this.click(this.accountMenu);
    await this.click(this.logoutLink);
  }
}
