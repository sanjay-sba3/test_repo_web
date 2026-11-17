import { BasePage } from './BasePage.js';
import { requireEnv } from '../support/config.js';

export class LoginPage extends BasePage {
  get email() { return this.page.getByRole('textbox', { name: 'Email' }); }
  get password() { return this.page.getByRole('textbox', { name: 'Password' }); }
  get signIn() { return this.page.getByRole('button', { name: 'Sign in' }); }
  get otpCode() { return this.page.getByRole('textbox', { name: 'One-time code' }); }
  get verifyCode() { return this.page.getByRole('button', { name: 'Verify code' }); }

  async login(user: string, pass: string): Promise<void> {
    await this.fill(this.email, user);
    await this.fill(this.password, pass);
    await this.click(this.signIn);

    await this.page.waitForURL(/\/verify/);
    await this.fill(this.otpCode, requireEnv('APP_OTP'));
    await this.click(this.verifyCode);

    await this.page.waitForURL(u => !u.pathname.startsWith('/login') && !u.pathname.startsWith('/verify'));
  }
}
