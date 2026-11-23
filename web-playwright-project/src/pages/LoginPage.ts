import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';
import { OtpPage } from './OtpPage.js';

export class LoginPage extends BasePage {
  get email(): Locator {
    return this.page.getByRole('textbox', { name: 'Email' });
  }
  get password(): Locator {
    return this.page.getByRole('textbox', { name: 'Password' });
  }
  get signInButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign in' });
  }

  async login(user: string, pass: string, otp: string): Promise<void> {
    await this.fill(this.email, user);
    await this.fill(this.password, pass);
    await this.click(this.signInButton);

    await this.page.waitForURL('**/otp');
    const otpPage = new OtpPage(this.page);
    await otpPage.enterOtp(otp);

    await this.page.waitForURL('**/dashboard');
  }
}
