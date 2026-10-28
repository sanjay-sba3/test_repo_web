import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get accountMenuButton() { return this.page.getByRole('button', { name: 'Account menu' }); }

  async openAccountMenu(): Promise<void> {
    await this.click(this.accountMenuButton);
  }
}
