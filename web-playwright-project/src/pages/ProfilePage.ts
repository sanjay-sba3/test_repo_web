import { BasePage } from './BasePage.js';
import { Page, Locator } from '@playwright/test';

export class ProfilePage extends BasePage {
  get backToDashboardLink(): Locator {
    return this.page.getByRole('link', { name: '← Back to dashboard' });
  }

  getDetail(label: string): Locator {
    return this.page.locator(`dt:text-is("${label}") + dd`);
  }

  async goBackToDashboard(): Promise<void> {
    await this.click(this.backToDashboardLink);
  }
}
