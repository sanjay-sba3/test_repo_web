import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    get email() { return this.page.getByRole('textbox', { name: 'Email' }); }
    get password() { return this.page.getByRole('textbox', { name: 'Password' }); }
    get rememberMeCheckbox() { return this.page.getByRole('checkbox', { name: 'Remember my email' }); }
    get signInButton() { return this.page.getByRole('button', { name: 'Sign in' }); }

    async login(email: string, pass: string, rememberMe: boolean = false): Promise<void> {
        await this.fill(this.email, email);
        await this.fill(this.password, pass);
        if (rememberMe) {
            await this.check(this.rememberMeCheckbox);
        }
        await this.click(this.signInButton);
    }
}
