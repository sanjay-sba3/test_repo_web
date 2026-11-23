import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboardLink() { return this.page.getByRole('link', { name: '← Back to dashboard' }); }
  get profileDetails() { return this.page.locator('dl'); } // The container for all profile key-value pairs
}
