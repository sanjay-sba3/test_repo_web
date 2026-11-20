import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class OtpPage extends BasePage {
  get digitInputs(): Locator { return this.page.getByRole('textbox', { name: /Digit \d/ }); }
  get submitButton(): Locator { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    const inputs = this.digitInputs;
    for (let i = 0; i < digits.length; i++) {
      await this.fill(inputs.nth(i), digits[i]);
    }
    await this.click(this.submitButton);
  }
}
