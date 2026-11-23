import { Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get backToDashboardLink() {
    return this.page.getByRole('link', { name: '← Back to dashboard' });
  }

  getDetail(label: string): Locator {
    return this.page.locator(`dt:text-is("${label}") + dd`);
  }
}
