import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class ProfilePage extends BasePage {
    get backToDashboardLink(): Locator { return this.page.getByRole('link', { name: '← Back to dashboard' }); }
}
