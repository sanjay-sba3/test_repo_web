import { Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class InventoryPage extends BasePage {
  get openMenuButton(): Locator {
    return this.page.getByRole('button', { name: 'Open Menu' });
  }

  get logoutLink(): Locator {
    return this.page.getByRole('link', { name: 'Logout' });
  }

  async logout(): Promise<void> {
    await this.click(this.openMenuButton);
    await this.click(this.logoutLink);
  }
}
