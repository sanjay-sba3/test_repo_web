import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  get viewProfile() { return this.page.getByRole('link', { name: 'View profile →' }); }
  get logout() { return this.page.getByRole('button', { name: 'Logout' }); }
}
