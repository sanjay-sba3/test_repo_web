Feature: User Registration and E2E Flow

  @dryrun @TS-360 @TC-TC1
  Scenario: Verify successful registration message and Go to Login button
    Given I open the "http://localhost:3000/register" page
    When I register with valid and unique data
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-359 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" button

  @dryrun @TS-358 @TC-TC1
  Scenario: Attempt registration with an existing email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-361 @TC-TC1
  Scenario: Verify registration fails with an empty email address
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an empty email address
    Then the "Email address" field should be invalid

  @dryrun @TS-361 @TC-TC2
  Scenario: Verify registration fails with an empty password
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an empty password
    Then the "Account password" field should be invalid

  @dryrun @TS-357 @TC-TC1
  Scenario: Successful end-to-end user journey: Register, Login, Navigate, Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user for the E2E journey
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I click the "Logout" button
    Then I should see the "Login" link
