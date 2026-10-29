import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboard() { return this.page.getByRole('link', { name: '← Back to dashboard' }); }
}
