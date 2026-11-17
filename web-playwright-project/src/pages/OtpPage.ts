import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  get otpBoxes() {
    return this.page.getByRole('textbox');
  }

  get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  async enterOtp(otp: string): Promise<void> {
    const otpDigits = otp.split('');
    for (let i = 0; i < otpDigits.length; i++) {
      await this.fill(this.otpBoxes.nth(i), otpDigits[i]);
    }
    await this.click(this.submitButton);
  }
}
