import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  get otpInputs() { return this.page.getByRole('textbox', { name: /Digit \d/ }); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(otp: string): Promise<void> {
    const inputs = await this.otpInputs.all();
    for (let i = 0; i < otp.length; i++) {
      if (inputs[i]) {
        await this.fill(inputs[i], otp[i]);
      }
    }
    await this.click(this.submitButton);
  }
}
