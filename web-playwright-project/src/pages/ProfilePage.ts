import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get accountMenu() { return this.page.getByRole('button', { name: 'Account menu' }); }
}
