import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  // #needs-review: locator based on test case, not in snapshot
  get backToDashboardLink() { return this.page.getByRole('link', { name: 'Back to Dashboard', exact: true }); }
}
