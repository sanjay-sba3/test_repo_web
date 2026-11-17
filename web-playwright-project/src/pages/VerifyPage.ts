import { BasePage } from './BasePage.js';
import { Page, Locator } from '@playwright/test';

export class VerifyPage extends BasePage {
  get oneTimeCode(): Locator { return this.page.getByRole('textbox', { name: 'One-time code' }); }
  get verifyCodeButton(): Locator { return this.page.getByRole('button', { name: 'Verify code' }); }

  async verify(otp: string): Promise<void> {
    await this.fill(this.oneTimeCode, otp);
    await this.click(this.verifyCodeButton);
  }
}
