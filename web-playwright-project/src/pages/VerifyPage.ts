import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

// This page was not in the captured pages. Locators are assumed based on test case descriptions.
export class VerifyPage extends BasePage {
  get otpInput(): Locator { return this.page.getByRole('textbox', { name: 'One-time password' }); }
  get verifyButton(): Locator { return this.page.getByRole('button', { name: 'Verify' }); }

  async enterOtp(otp: string): Promise<void> {
    await this.fill(this.otpInput, otp);
    await this.click(this.verifyButton);
  }
}
