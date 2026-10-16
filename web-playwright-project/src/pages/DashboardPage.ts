import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  // The 'Logout' button is not in the snapshot, so this is a best guess based on the test case.
  // The scenario is tagged with @needs-review.
  get logoutButton() { return this.page.getByRole('button', { name: 'Logout', exact: true }); }

  async logout(): Promise<void> {
    await this.click(this.logoutButton);
  }
}
