import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboardLink() {
    return this.page.getByRole('link', { name: '← Back to dashboard' });
  }

  get mobileDetail() {
    return this.page.locator('dt:text-is("Mobile") + dd');
  }

  get ageDetail() {
    return this.page.locator('dt:text-is("Age") + dd');
  }
}
