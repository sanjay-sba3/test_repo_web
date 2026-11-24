import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class VerifyPage extends BasePage {
  get otpInput(): Locator {
    // This page is not in snapshots. Knowledge base says it has a single input with
    // autocomplete="one-time-code". Using a CSS selector as a last resort to get a unique locator.
    return this.page.locator('input[autocomplete="one-time-code"]');
  }

  get verifyButton(): Locator {
    // This page is not in snapshots. Test case expects a "Verify" button.
    return this.page.getByRole('button', { name: 'Verify' });
  }

  async enterOtp(otp: string): Promise<void> {
    await this.fill(this.otpInput, otp);
    await this.click(this.verifyButton);
  }
}
