Feature: User Registration and Authentication Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  # needs-review: The 'Registration successful' message and 'Go to Login' button are not in the page snapshot.
  @dryrun @needs-review @TS-310 @TC-TC2
  Scenario: Successful end-to-end user journey: Register, Login, Navigate, Logout
    When I register a new user with valid details
    Then I should see the text "Registration successful"
    And I should see the "Go to Login" button
    When I click the "Go to Login" button
    Then the URL should contain "/login"
    When I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then the URL should contain "/login"

  @dryrun @TS-308 @TC-TC3
  Scenario: Attempt registration with an already existing email
    When I attempt to register with an existing email
    Then I should see the text "Email address already in use"
    And the URL should contain "/register"

  @dryrun @TS-308 @TC-TC5
  Scenario: Attempt registration with mismatched passwords
    When I attempt to register with mismatched passwords
    Then the "Confirm password" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-311 @TC-TC1
  Scenario: Attempt registration with empty required fields
    When I click the "Create account" button
    Then the "First name" field should be invalid
    And the "Email address" field should be invalid
    And the "Account password" field should be invalid
    And the URL should contain "/register"

  @dryrun @TS-308 @TC-TC4
  Scenario: Attempt to log in with an incorrect password
    Given I open the "http://localhost:3000/login" page
    When I log in with an incorrect password
    Then I should see the text "Invalid email or password"
    And the URL should contain "/login"

  @dryrun @TS-308 @TC-TC2
  Scenario: Unauthenticated user is redirected to login when accessing dashboard
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
