import { BasePage } from './BasePage.js';
import { Page, Locator } from '@playwright/test';

export class ProfilePage extends BasePage {
  get backToDashboardLink(): Locator { return this.page.getByRole('link', { name: '← Back to dashboard' }); }
}
