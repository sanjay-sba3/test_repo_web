import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { loadTestData } from '../support/testData.js';
import { generateValue, resolveTokens } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { email?: string; password?: string };
const testData = await loadTestData<{ validPassword: string }>('test_03_11_06');

async function fillAndSubmitRegistration(world: JourneyWorld, overrides: Record<string, any>) {
  const registerPage = new RegisterPage(world.page);
  const password = testData.validPassword;

  const details = {
    firstName: generateValue('firstName'),
    lastName: generateValue('lastName'),
    email: generateValue('email'),
    age: '25',
    gender: 'Male',
    password: password,
    confirmPassword: password,
    acceptTerms: true,
    ...overrides,
  };

  if (details.email) world.email = details.email;
  if (details.password) world.password = details.password;

  await registerPage.fillForm(details);
  await registerPage.submitForm();
}

When('I attempt to register with an empty email', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { email: '' });
});

When('I attempt to register with an empty password', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { password: '', confirmPassword: '' });
});

When('I attempt to register with empty email and password', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { email: '', password: '', confirmPassword: '' });
});

When('I register a new user', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, {});
});

When('I attempt to register with the same email again', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { email: this.email });
});

When('I register a new user with an XSS name', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, { firstName: resolveTokens('{{security.comment}}') });
});

When('I register a new user for the E2E flow', async function (this: JourneyWorld) {
  await fillAndSubmitRegistration(this, {});
});

When('I sign in as that new user', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('User credentials not found in world. Did you register a user first?');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});

// This step is needed because the shared step asserts visibility, but after logout the page reloads
// and the button might not be immediately visible. The shared step `I should see the "..." button` is sufficient.
// However, if a specific text on the login page is needed, this could be used.
// For now, relying on shared steps.
Then('I should see the text {string}', async function (this: CustomWorld, text: string) {
  await new RegisterPage(this.page).expectText(text);
});
