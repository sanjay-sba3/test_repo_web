import { BasePage } from './BasePage.js';
import { Locator, Page } from '@playwright/test';

export class OtpPage extends BasePage {
  getDigitInput(index: number): Locator {
    return this.page.getByRole('textbox', { name: `Digit ${index}` });
  }
  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.fill(this.getDigitInput(i + 1), digits[i]);
    }
    await this.click(this.submitButton);
  }
}
