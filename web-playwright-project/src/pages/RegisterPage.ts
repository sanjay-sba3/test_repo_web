import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';

interface RegistrationDetails {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  password: string;
  mobileNumber?: string;
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
  get mobileNumber(): Locator {
    return this.page.getByRole('textbox', { name: 'Mobile number' });
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

  async register(details: RegistrationDetails): Promise<void> {
    await this.fill(this.firstName, details.firstName);
    await this.fill(this.lastName, details.lastName);
    await this.fill(this.emailAddress, details.email);
    if (details.mobileNumber) {
      await this.fill(this.mobileNumber, details.mobileNumber);
    }
    await this.fill(this.age, details.age);
    await this.select(this.gender, details.gender);
    await this.fill(this.password, details.password);
    await this.fill(this.confirmPassword, details.password);
    await this.check(this.terms);
    await this.click(this.createAccountButton);
  }
}
