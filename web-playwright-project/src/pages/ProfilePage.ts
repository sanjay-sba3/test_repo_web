import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboardLink() { return this.page.getByRole('link', { name: '← Back to dashboard', exact: true }); }
  get firstNameValue() { return this.page.locator('dt:has-text("First name") + dd'); }

  async goBackToDashboard(): Promise<void> {
    await this.click(this.backToDashboardLink);
  }
}
