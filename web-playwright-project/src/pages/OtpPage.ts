import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class OtpPage extends BasePage {
  get digit1(): Locator { return this.page.getByRole('textbox', { name: 'Digit 1' }); }
  get digit2(): Locator { return this.page.getByRole('textbox', { name: 'Digit 2' }); }
  get digit3(): Locator { return this.page.getByRole('textbox', { name: 'Digit 3' }); }
  get digit4(): Locator { return this.page.getByRole('textbox', { name: 'Digit 4' }); }
  get digit5(): Locator { return this.page.getByRole('textbox', { name: 'Digit 5' }); }
  get digit6(): Locator { return this.page.getByRole('textbox', { name: 'Digit 6' }); }
  get submitButton(): Locator { return this.page.getByRole('button', { name: 'Submit' }); }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    await this.fill(this.digit1, digits[0]);
    await this.fill(this.digit2, digits[1]);
    await this.fill(this.digit3, digits[2]);
    await this.fill(this.digit4, digits[3]);
    await this.fill(this.digit5, digits[4]);
    await this.fill(this.digit6, digits[5]);
    await this.click(this.submitButton);
  }
}
