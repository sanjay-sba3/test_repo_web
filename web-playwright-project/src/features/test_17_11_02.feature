Feature: User Authentication and Flow

  Background:
    Given I open the "http://localhost:3000/register" page

  @dryrun @TS-464 @TC-TC1 @TS-469 @TC-TC1 @TS-474 @TC-TC1 @TS-483 @TC-TC1
  Scenario: Unauthenticated user is redirected to login page from dashboard
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-465 @TC-TC1 @TS-470 @TC-TC1 @TS-474 @TC-TC2 @TS-484 @TC-TC1
  Scenario: Unauthenticated user is redirected to login page from profile
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    Then I should see the "Sign in" button

  @dryrun @TS-466 @TC-TC1 @TS-471 @TC-TC1 @TS-476 @TC-TC1 @TS-482 @TC-TC1
  Scenario: Successful registration displays a success message
    When I successfully register a new user
    Then I should see the text "Registration successful"
    Then I should see the "Go to login" link

  @dryrun @TS-475 @TC-TC1
  Scenario: Registration with an empty required field fails
    When I attempt to register with an empty email
    And I click the "Create account" button
    Then the "Email address" field should be invalid

  @dryrun @TS-463 @TC-TC1 @TS-468 @TC-TC1 @TS-473 @TC-TC1 @TS-481 @TC-TC1
  Scenario: Registration fails when using an existing email
    # needs-review: The UI discovery did not capture the server response for a duplicate email registration. The expected message "Email already registered" is from the requirement.
    When I attempt to register with an existing email
    Then I should see the text "Email already registered"
    And the URL should contain "/register"

  @dryrun @TS-462 @TC-TC1 @TS-467 @TC-TC1 @TS-472 @TC-TC1 @TS-480 @TC-TC1
  Scenario: Successful E2E user flow: Register, Login, Navigate, Logout
    When I register a new user and go to login
    And I log in as the new user
    Then the URL should contain "/dashboard"
    When I click the "View profile →" link
    Then the URL should contain "/profile"
    When I click the "← Back to dashboard" link
    Then the URL should contain "/dashboard"
    When I log out
    Then the URL should contain "/login"
    And I should see the "Login" link
