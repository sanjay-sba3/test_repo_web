import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get viewProfileLink() { return this.page.getByRole('link', { name: 'View profile →', exact: true }); }
  get logoutButton() { return this.page.getByRole('button', { name: 'Logout', exact: true }); }

  async clickProfileLink() {
    await this.click(this.viewProfileLink);
  }

  async clickLogout() {
    await this.click(this.logoutButton);
  }
}