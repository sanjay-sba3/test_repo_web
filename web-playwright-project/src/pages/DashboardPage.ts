import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get accountMenu() { return this.page.getByRole('button', { name: 'Account menu' }); }
  get profileLink() { return this.page.getByRole('link', { name: 'Profile' }); }
  get logoutLink() { return this.page.getByRole('link', { name: 'Logout' }); }
}