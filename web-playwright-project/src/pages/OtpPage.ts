import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  // The spec says "each with aria-label='Digit n'" and SESSION log says "(first box \"Digit 1\")".
  // The spec also says pasting/filling spreads digits across boxes.
  // We will try filling the first box with the whole OTP.
  get firstDigitInput() { return this.page.getByRole('textbox', { name: 'Digit 1' }); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    const inputs = this.page.getByRole('textbox');
    for (let i = 0; i < digits.length; i++) {
      await this.fill(inputs.nth(i), digits[i]);
    }
    await this.click(this.submitButton);
  }
}
