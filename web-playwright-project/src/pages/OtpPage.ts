import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

export class OtpPage extends BasePage {
  get digitInputs(): Locator {
    return this.page.getByRole('textbox', { name: /Digit \d/ });
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  get useSingleFieldLink(): Locator {
    return this.page.getByRole('link', { name: 'Use single field' });
  }

  async enterOtp(otp: string): Promise<void> {
    const digits = otp.split('');
    for (let i = 0; i < digits.length; i++) {
      await this.digitInputs.nth(i).fill(digits[i]);
    }
    await this.click(this.submitButton);
  }
}
