Feature: User Authentication and Navigation Flow

  @dryrun @TS-462 @TC-TC1 @TS-467 @TC-TC1 @TS-472 @TC-TC1
  Scenario: Successful E2E user flow: Register, Login, Navigate, Logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link
    When I click the "Go to login" link
    Then the URL should contain "/login"
    When I sign in as the new user
    Then the URL should contain "/verify"
    When I enter the OTP
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile and back
    When I click the "Logout" button
    Then I should see the "Login" link
    And the URL should contain "/login"

  @dryrun @TS-466 @TC-TC1 @TS-471 @TC-TC1 @TS-476 @TC-TC1
  Scenario: Verify success message after successful registration
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  @dryrun @TS-463 @TC-TC1 @TS-468 @TC-TC1 @TS-473 @TC-TC1
  Scenario: Verify registration fails with an already registered email
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an existing email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-475 @TC-TC1
  Scenario: Validate registration form with empty email field
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with an empty email field
    Then the "Email address" field should be invalid

  @dryrun @TS-464 @TC-TC1 @TS-469 @TC-TC1 @TS-474 @TC-TC1
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" heading

  @dryrun @TS-465 @TC-TC1 @TS-470 @TC-TC1 @TS-474 @TC-TC2
  Scenario: Unauthenticated access to profile page redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign in" heading
