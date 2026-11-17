import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';
import { requireEnv } from '../support/config.js';

export class VerifyOtpPage extends BasePage {
  get otpCode(): Locator { return this.page.getByRole('textbox', { name: 'One-time code' }); }
  get verifyCodeButton(): Locator { return this.page.getByRole('button', { name: 'Verify code' }); }

  async submitOtp(): Promise<void> {
    await this.fill(this.otpCode, requireEnv('APP_OTP'));
    await this.click(this.verifyCodeButton);
    await this.page.waitForURL(url => !url.pathname.startsWith('/verify'));
  }
}
