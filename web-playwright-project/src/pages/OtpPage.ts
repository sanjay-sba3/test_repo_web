import { BasePage } from './BasePage.js';

export class OtpPage extends BasePage {
  get digit1() { return this.page.getByRole('textbox', { name: 'Digit 1' }); }
  get digit2() { return this.page.getByRole('textbox', { name: 'Digit 2' }); }
  get digit3() { return this.page.getByRole('textbox', { name: 'Digit 3' }); }
  get digit4() { return this.page.getByRole('textbox', { name: 'Digit 4' }); }
  get digit5() { return this.page.getByRole('textbox', { name: 'Digit 5' }); }
  get digit6() { return this.page.getByRole('textbox', { name: 'Digit 6' }); }
  get submitButton() { return this.page.getByRole('button', { name: 'Submit' }); }

  async submitOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    if (digits.length !== 6) {
      throw new Error('OTP must be 6 digits');
    }
    await this.fill(this.digit1, digits[0]);
    await this.fill(this.digit2, digits[1]);
    await this.fill(this.digit3, digits[2]);
    await this.fill(this.digit4, digits[3]);
    await this.fill(this.digit5, digits[4]);
    await this.fill(this.digit6, digits[5]);
    await this.click(this.submitButton);
  }
}
