import { BasePage } from './BasePage.js';
import { Locator, Page } from '@playwright/test';

export class OtpPage extends BasePage {
  get otpBoxes() {
    return this.page.getByRole('group', { name: 'One-time password' }).getByRole('textbox');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.otpBoxes.nth(i).fill(digits[i]);
    }
    await this.click(this.submitButton);
  }
}
