import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { LoginPage } from '../pages/LoginPage.js';

Then('the "{string}" field should have focus', async function (this: CustomWorld, fieldName: string) {
  const loginPage = new LoginPage(this.page);
  let locator;
  switch (fieldName) {
    case 'Email':
      locator = loginPage.email;
      break;
    case 'Password':
      locator = loginPage.password;
      break;
    default:
      throw new Error(`Field "${fieldName}" is not defined on the Login page object.`);
  }
  await expect(locator).toBeFocused();
});

Then('the "{string}" button should have focus', async function (this: CustomWorld, buttonName: string) {
  const loginPage = new LoginPage(this.page);
  let locator;
  if (buttonName === 'Sign in') {
    locator = loginPage.signIn;
  } else {
    throw new Error(`Button "${buttonName}" is not defined on the Login page object.`);
  }
  await expect(locator).toBeFocused();
});

Then('the "Password" field should be a password field', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await expect(loginPage.password).toHaveAttribute('type', 'password');
});
