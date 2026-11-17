import { BasePage } from './BasePage.js';
import { expect, Locator, Page } from '@playwright/test';

export class LoginPage extends BasePage {
  get email() { return this.page.getByRole('textbox', { name: 'Email' }); }
  get password() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signInButton() { return this.page.getByRole('button', { name: 'Sign in' }); }
  get otpCode() { return this.page.getByRole('textbox', { name: 'One-time code' }); }
  get verifyCodeButton() { return this.page.getByRole('button', { name: 'Verify code' }); }
  get registerLink() { return this.page.getByRole('link', { name: 'Register now' }); }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.email, user);
    await this.fill(this.password, pass);
    await this.click(this.signInButton);
  }

  async enterOtp(otp: string): Promise<void> {
    await this.fill(this.otpCode, otp);
    await this.click(this.verifyCodeButton);
    await this.page.waitForURL((url) => !url.pathname.startsWith('/login'));
  }

  async loginWithOtp(user: string, pass: string, otp: string): Promise<void> {
    await this.login(user, pass);
    await this.enterOtp(otp);
  }
}
