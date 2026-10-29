Feature: Web User Flows

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-362 @TC-TC1
  Scenario: Successful end-to-end user journey: register, login, navigate, and logout
    When I register a new user with password "SecurePassword123!"
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link

  @dryrun @TS-363 @TC-TC1
  Scenario: Verify registration fails with a duplicate email address
    When I register a new user with password "ValidPassword123!"
    Then I should see the text "Registration successful"
    Given I open the "http://localhost:3000/register" page
    When I register the same user again with password "ValidPassword123!"
    Then I should see the text "Email already registered"

  @dryrun @TS-366 @TC-TC1
  Scenario: Verify 'Go to login' link navigates to the login page after registration
    When I register a new user with password "${APP_PASSWORD}"
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-364 @TC-TC1
  Scenario: Unauthorized access to Dashboard page redirects to Login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-364 @TC-TC2
  Scenario: Unauthorized access to Profile page redirects to Login page
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-365 @TC-TC1
  Scenario: Login with existing user and incorrect password
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I fill "Password" with "anIncorrectPassword123!"
    When I click the "Sign in" button
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  @dryrun @TS-365 @TC-TC2
  Scenario: Login with non-existent user email
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with "{{random.email}}"
    When I fill "Password" with "anyPassword123"
    When I click the "Sign in" button
    Then I should see the text "Invalid email or password"
    Then the URL should contain "/login"

  @dryrun @TS-365 @TC-TC3
  Scenario: Login attempt with an empty password field
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with the value of env "APP_USERNAME"
    When I click the "Sign in" button
    Then the "Password" field should be invalid

  @dryrun @TS-365 @TC-TC4
  Scenario: Login attempt with an empty email field
    Given I open the "http://localhost:3000/login" page
    When I fill "Password" with "anyPassword123"
    When I click the "Sign in" button
    Then the "Email" field should be invalid

  @dryrun @TS-365 @TC-TC5
  Scenario: Login attempt with an invalid email format
    Given I open the "http://localhost:3000/login" page
    When I fill "Email" with "{{negative.email}}"
    When I fill "Password" with "anyPassword123"
    When I click the "Sign in" button
    Then the "Email" field should be invalid
