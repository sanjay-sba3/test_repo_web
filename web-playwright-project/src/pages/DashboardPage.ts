import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  // #needs-review: locator based on test case, not in snapshot
  get viewProfileLink() { return this.page.getByRole('link', { name: 'View Profile', exact: true }); }
  // #needs-review: locator based on test case, not in snapshot
  get logoutButton() { return this.page.getByRole('button', { name: 'Logout', exact: true }); }
}
