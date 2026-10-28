Feature: User Authentication and Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-329 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login page
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-331 @TC-TC1
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"

  @dryrun @TS-330 @TC-TC1
  Scenario: Verify success message and 'Go to Login' button after successful registration
    When I fill the registration form with valid data
    And I click the "Create account" button
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link

  @dryrun @TS-328 @TC-TC1
  Scenario: Attempt registration with an existing email address
    When I register a new user
    Then I should see the text "Registration successful"
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the same new user credentials
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-327 @TC-TC1
  Scenario: Successful end-to-end user journey: Register, Login, View Profile, Logout
    When I register a new user
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
    Then the URL should contain "/login"

  @dryrun @TS-327 @TC-TC2
  Scenario: Registration fails when password and confirmation do not match
    When I fill the registration form with mismatched passwords
    And I click the "Create account" button
    Then the "Confirm password" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-327 @TC-TC3
  Scenario: Registration fails when required 'Email' field is empty
    When I fill the registration form but leave the email empty
    And I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-327 @TC-TC4
  Scenario: Registration fails when 'Email' field has an invalid format
    When I fill the registration form with an invalid email
    And I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-327 @TC-TC5
  Scenario: User cannot access protected pages via browser back button after logout
    When I register a new user
    And I click the "Go to login" link
    And I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"
    When I use the browser back button
    Then the URL should contain "/login"
    And I should not see the text "Welcome back, Test"
