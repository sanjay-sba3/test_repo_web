import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboardLink() { return this.page.getByRole('link', { name: '← Back to dashboard' }); }
  get userNameHeading() { return this.page.getByRole('heading', { name: 'Test User', level: 1 }); }
}