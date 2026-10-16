import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboardLink() { return this.page.getByRole('link', { name: '← Back to dashboard', exact: true }); }
  get profileHeader() { return this.page.getByRole('heading', { level: 1 }); }

  async clickBackToDashboard() {
    await this.click(this.backToDashboardLink);
  }
}