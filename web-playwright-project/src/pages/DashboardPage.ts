import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get viewProfileLink() { return this.page.getByRole('link', { name: 'View profile →' }); }
  get logoutButton() { return this.page.getByRole('button', { name: 'Logout' }); }

  async viewProfile(): Promise<void> {
    await this.click(this.viewProfileLink);
  }

  async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }
}