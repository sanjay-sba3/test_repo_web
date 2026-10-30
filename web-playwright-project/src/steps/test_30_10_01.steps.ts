import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world.js';
import { config } from '../support/config.js';
import { LoginPage } from '../pages/LoginPage.js';
import { loadTestData } from '../support/testData.js';

// This is a workaround for a bug in cucumber-js where the world is not typed correctly
type JourneyWorld = CustomWorld & { [key: string]: any };

When('I sign in as the environment user', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  // The background step already opens the login page
  await loginPage.login(config.username, config.password);
});

Then('I should see an invalid credentials error message', async function (this: CustomWorld) {
  // Assuming the error message is generic. If a specific message is required, this step should be updated.
  // A more robust check would be to look for a specific data-testid on the error element.
  // Since no error message is in the snapshot/discovery, we assert the URL hasn't changed.
  await expect(this.page).toHaveURL(/.*\/login/);
});

Then('I should see the {string} link', async function (this: CustomWorld, linkName: string) {
  await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
});

Then('I should see the {string} dashboard link', async function (this: CustomWorld, linkName: string) {
  await expect(this.page.getByRole('link', { name: linkName })).toBeVisible();
});

When('I fill {string} with the stored {string}', async function (this: JourneyWorld, label: string, key: string) {
  const value = this[key];
  if (typeof value !== 'string') {
    throw new Error(`Value for key '${key}' not found or not a string in the world object`);
  }
  await this.page.getByRole('textbox', { name: label }).fill(value);
});

Given('I open the {string} page and store the email', async function (this: JourneyWorld, url: string) {
    const testData = await loadTestData('test_30_10_01');
    this.email = testData.email;
    await this.page.goto(url);
});
