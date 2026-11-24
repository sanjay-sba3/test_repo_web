import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class OtpPage extends BasePage {
  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  digitInput(index: number): Locator {
    return this.page.getByRole('textbox', { name: `Digit ${index}` });
  }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < Math.min(digits.length, 6); i++) {
      await this.fill(this.digitInput(i + 1), digits[i]);
    }
    await this.click(this.submitButton);
  }
}
