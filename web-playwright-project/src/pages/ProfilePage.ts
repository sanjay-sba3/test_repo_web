import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  get logOutButton() { return this.page.getByRole('button', { name: 'Log out' }); }
  get accountMenu() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get dashboardLink() { return this.page.getByRole('link', { name: 'Dashboard' }); }
}