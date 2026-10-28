import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get accountMenu() { return this.page.getByRole('button', { name: 'Account menu' }); }
}
