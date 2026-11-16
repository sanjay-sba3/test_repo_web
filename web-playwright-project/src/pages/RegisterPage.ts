import { BasePage } from './BasePage.js';
import { Page, Locator } from '@playwright/test';

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get firstName(): Locator {
    return this.page.getByRole('textbox', { name: 'First name' });
  }

  get lastName(): Locator {
    return this.page.getByRole('textbox', { name: 'Last name' });
  }

  get emailAddress(): Locator {
    return this.page.getByRole('textbox', { name: 'Email address' });
  }

  get age(): Locator {
    return this.page.getByRole('spinbutton', { name: 'Age (years)' });
  }

  get gender(): Locator {
    return this.page.getByRole('combobox', { name: 'Gender identity' });
  }

  get password(): Locator {
    return this.page.getByRole('textbox', { name: 'Account password' });
  }

  get confirmPassword(): Locator {
    return this.page.getByRole('textbox', { name: 'Confirm password' });
  }

  get terms(): Locator {
    return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' });
  }

  get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Create account' });
  }

  get goToLoginLink(): Locator {
    return this.page.getByRole('link', { name: 'Go to login' });
  }
}
