import { BasePage } from './BasePage.js';
import { Page } from '@playwright/test';

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get backToDashboardLink() {
    return this.page.getByRole('link', { name: '← Back to dashboard' });
  }
}
