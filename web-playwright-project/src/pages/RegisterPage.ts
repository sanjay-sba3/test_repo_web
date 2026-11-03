import { BasePage } from './BasePage.js';
import { Locator } from '@playwright/test';
import { generateValue } from '../support/testDataGenerator.js';

interface RegistrationData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  ageYears: string;
  genderIdentity: string;
  accountPassword: string;
  confirmPassword: string;
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

  get ageYears(): Locator {
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

  get createAccount(): Locator {
    return this.page.getByRole('button', { name: 'Create account' });
  }

  get goToLogin(): Locator {
    return this.page.getByRole('link', { name: 'Go to login' });
  }

  async fillAllFieldsWithValidData(overrides: Partial<RegistrationData> = {}): Promise<void> {
    const defaultData: RegistrationData = {
      firstName: generateValue('firstName'),
      lastName: generateValue('lastName'),
      emailAddress: generateValue('email'),
      mobileNumber: '1234567890',
      ageYears: '25',
      genderIdentity: 'Male',
      accountPassword: 'ValidPassword123!',
      confirmPassword: 'ValidPassword123!',
      acceptTerms: true,
    };

    const data = { ...defaultData, ...overrides };

    await this.fill(this.firstName, data.firstName);
    await this.fill(this.lastName, data.lastName);
    await this.fill(this.emailAddress, data.emailAddress);
    await this.fill(this.mobileNumber, data.mobileNumber);
    await this.fill(this.ageYears, data.ageYears);
    await this.select(this.genderIdentity, data.genderIdentity);
    await this.fill(this.accountPassword, data.accountPassword);
    await this.fill(this.confirmPassword, data.confirmPassword);
    if (data.acceptTerms) {
      await this.check(this.acceptTerms);
    } else {
      await this.uncheck(this.acceptTerms);
    }
  }
}
