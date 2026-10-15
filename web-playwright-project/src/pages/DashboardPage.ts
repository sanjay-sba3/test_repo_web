import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get viewProfileLink() { return this.page.getByRole('link', { name: 'View profile →', exact: true }); }
  get logoutButton() { return this.page.getByRole('button', { name: 'Logout', exact: true }); }

  async navigateToProfile(): Promise<void> {
    await this.click(this.viewProfileLink);
  }
}
