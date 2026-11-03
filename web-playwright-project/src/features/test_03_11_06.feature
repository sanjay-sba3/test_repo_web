Feature: User Registration and Authentication

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-433 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-435 @TC-TC1
  Scenario: Verify registration fails with an empty email address
    When I fill the registration form but leave the email empty
    And I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-435 @TC-TC2
  Scenario: Verify registration fails with an empty password
    When I fill the registration form but leave the password empty
    And I click the "Create account" button
    Then the "Account password" field should be invalid

  @dryrun @TS-435 @TC-TC3
  Scenario: Verify registration fails with both email and password empty
    When I fill the registration form but leave email and password empty
    And I click the "Create account" button
    Then the "Email address" field should be invalid
    And the "Account password" field should be invalid

  @dryrun @TS-434 @TC-TC1
  Scenario: Attempt registration with an existing email address
    When I register a new user and store their credentials
    Then I should see the text "Registration successful"
    When I open the "http://localhost:3000/register" page
    And I attempt to register again with the same details
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-436 @TC-TC1
  Scenario: Verify XSS prevention on registration form text fields
    When I register a new user with a security-testing name
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    And I log in with the stored credentials
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    And I should see the text "<script>alert(1)</script>"
    When I click the "← Back to dashboard" link
    And I click the "Logout" button
    Then I should see the "Sign in" button

  @dryrun @TS-432 @TC-TC1
  Scenario: E2E Successful user registration, login, navigation, and logout
    When I register a new user and store their credentials
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I log in with the stored credentials
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Sign in" button
