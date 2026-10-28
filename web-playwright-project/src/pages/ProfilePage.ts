import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboardLink() { return this.page.getByRole('link', { name: '← Back to dashboard' }); }

  async returnToDashboard(): Promise<void> {
    await this.click(this.backToDashboardLink);
  }
}
