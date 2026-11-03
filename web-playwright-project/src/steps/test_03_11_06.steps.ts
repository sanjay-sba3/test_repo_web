import { When, Then, Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world.js';
import { generateValue } from '../support/testDataGenerator.js';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';

type JourneyWorld = CustomWorld & { 
  email?: string; 
  password?: string; 
  firstName?: string;
};

async function fillRegistrationForm(world: JourneyWorld, overrides: any) {
  const registerPage = new RegisterPage(world.page);
  await registerPage.fillAllFieldsWithValidData(overrides);
}

When('I fill the registration form but leave the email empty', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { emailAddress: '' });
});

When('I fill the registration form but leave the password empty', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { accountPassword: '', confirmPassword: '' });
});

When('I fill the registration form but leave email and password empty', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { emailAddress: '', accountPassword: '', confirmPassword: '' });
});

When('I register a new user and store their credentials', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'ValidPassword123!';
  this.firstName = generateValue('firstName');
  await fillRegistrationForm(this, { 
    emailAddress: this.email, 
    accountPassword: this.password, 
    confirmPassword: this.password,
    firstName: this.firstName
  });
  await new RegisterPage(this.page).createAccount.click();
});

When('I attempt to register again with the same details', async function (this: JourneyWorld) {
  await fillRegistrationForm(this, { 
    emailAddress: this.email, 
    accountPassword: this.password, 
    confirmPassword: this.password,
    firstName: this.firstName
  });
  await new RegisterPage(this.page).createAccount.click();
});

When('I register a new user with a security-testing name', async function (this: JourneyWorld) {
  this.email = generateValue('email');
  this.password = 'AStrongPassword123!';
  this.firstName = generateValue('comment', 'security'); // <script>alert(1)</script>
  await fillRegistrationForm(this, {
    firstName: this.firstName,
    emailAddress: this.email,
    accountPassword: this.password,
    confirmPassword: this.password,
  });
  await new RegisterPage(this.page).createAccount.click();
});

When('I log in with the stored credentials', async function (this: JourneyWorld) {
  if (!this.email || !this.password) {
    throw new Error('Credentials were not stored from a previous step.');
  }
  const loginPage = new LoginPage(this.page);
  await loginPage.login(this.email, this.password);
});
