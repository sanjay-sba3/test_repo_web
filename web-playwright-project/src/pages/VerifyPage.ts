import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

// NOTE: This page object is based on test case descriptions as the page was not captured.
// Locators may need to be updated.
export class VerifyPage extends BasePage {
  get otpInput(): Locator {
    // Assuming a single textbox for the OTP code on this page.
    return this.page.getByRole('textbox');
  }

  get verifyButton(): Locator {
    return this.page.getByRole('button', { name: 'Verify' });
  }
}
