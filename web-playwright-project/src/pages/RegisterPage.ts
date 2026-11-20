import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  password: string;
}

export class RegisterPage extends BasePage {
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

  get genderIdentity(): Locator {
    return this.page.getByRole('combobox', { name: 'Gender identity' });
  }

  get accountPassword(): Locator {
    return this.page.getByRole('textbox', { name: 'Account password' });
  }

  get confirmPassword(): Locator {
    return this.page.getByRole('textbox', { name: 'Confirm password' });
  }

  get acceptTerms(): Locator {
    return this.page.getByRole('checkbox', { name: 'I accept the terms and conditions' });
  }

  get createAccountButton(): Locator {
    return this.page.getByRole('button', { name: 'Create account' });
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    await this.fill(this.emailAddress, data.email);
    await this.fill(this.age, data.age);
    await this.select(this.genderIdentity, data.gender);
    await this.fill(this.accountPassword, data.password);
    await this.fill(this.confirmPassword, data.password);
    await this.check(this.acceptTerms);
    await this.click(this.createAccountButton);
  }
}
