import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  get otpBoxes() { return this.page.getByRole('textbox'); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.otpBoxes.nth(i).fill(digits[i]);
    }
    await this.click(this.submitButton);
  }
}
