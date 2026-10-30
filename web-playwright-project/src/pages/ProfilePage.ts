import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get accountMenuButton() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get logOutButton() { return this.page.getByRole('button', { name: 'Log out' }); }
}