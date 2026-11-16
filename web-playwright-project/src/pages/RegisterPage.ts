import { BasePage } from './BasePage.js';
import { Locator, expect } from '@playwright/test';

interface RegistrationDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  age: string;
  gender: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms: boolean;
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
  get accountPassword(): Locator {
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

  async fillForm(details: Partial<RegistrationDetails>): Promise<void> {
    if (details.firstName) await this.fill(this.firstName, details.firstName);
    if (details.lastName) await this.fill(this.lastName, details.lastName);
    if (details.email) await this.fill(this.emailAddress, details.email);
    if (details.mobileNumber) await this.fill(this.mobileNumber, details.mobileNumber);
    if (details.age) await this.fill(this.age, details.age);
    if (details.gender) await this.select(this.gender, details.gender);
    if (details.password) await this.fill(this.accountPassword, details.password);
    if (details.confirmPassword) await this.fill(this.confirmPassword, details.confirmPassword);
    if (details.acceptTerms) await this.check(this.terms);
  }

  async submitForm(): Promise<void> {
    await this.click(this.createAccountButton);
  }

  async expectText(text: string): Promise<void> {
    await expect(this.page.getByText(text).first()).toBeVisible();
  }
}