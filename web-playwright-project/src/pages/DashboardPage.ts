import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get logoutButton() { return this.page.getByRole('button', { name: 'Logout', exact: true }); }
  get viewProfileLink() { return this.page.getByRole('link', { name: 'View profile →', exact: true }); }

  async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }

  async viewProfile(): Promise<void> {
    await this.click(this.viewProfileLink);
  }
}
