import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { LoginPage } from '../pages/LoginPage.js';

Then('the "{string}" field should be a password input', async function (this: CustomWorld, label: string) {
  const loginPage = new LoginPage(this.page);
  if (label === 'Password') {
    await expect(loginPage.password).toHaveAttribute('type', 'password');
  } else {
    throw new Error(`Step is only designed for the 'Password' field, but got: ${label}`);
  }
});

Then('the "{string}" field should be focused', async function (this: CustomWorld, label: string) {
  const loginPage = new LoginPage(this.page);
  let locator;
  if (label === 'Email') {
    locator = loginPage.email;
  } else if (label === 'Password') {
    locator = loginPage.password;
  } else {
    throw new Error(`Unknown field label for focus check: ${label}`);
  }
  await expect(locator).toBeFocused();
});

Then('the "{string}" button should be focused', async function (this: CustomWorld, name: string) {
  const loginPage = new LoginPage(this.page);
  let locator;
  if (name === 'Sign in') {
    locator = loginPage.signInButton;
  } else {
    throw new Error(`Unknown button name for focus check: ${name}`);
  }
  await expect(locator).toBeFocused();
});
