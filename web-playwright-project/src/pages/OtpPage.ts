import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class OtpPage extends BasePage {
  get digitInputs(): Locator {
    return this.page.getByRole('group', { name: 'One-time password' }).getByRole('textbox');
  }
  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.fill(this.digitInputs.nth(i), digits[i]);
    }
    await this.click(this.submitButton);
  }
}
