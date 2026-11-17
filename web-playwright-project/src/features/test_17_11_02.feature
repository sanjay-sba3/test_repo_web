Feature: User Authentication and Flow

  @dryrun @TS-464 @TC-TC1 @TS-469
  Scenario: Unauthenticated access to dashboard redirects to login
    Given I open the "http://localhost:3000/dashboard" page
    Then the URL should contain "/login"
    And I should see the "Sign in" heading

  @dryrun @TS-465 @TC-TC1 @TS-470
  Scenario: Unauthenticated access to profile redirects to login
    Given I open the "http://localhost:3000/profile" page
    Then the URL should contain "/login"
    And I should see the "Sign in" heading

  @dryrun @TS-466 @TC-TC1 @TS-471
  Scenario: Successful registration displays success message
    Given I open the "http://localhost:3000/register" page
    When I register with all valid details
    Then I should see the text "Registration successful"
    And I should see the "Go to login" link

  # needs-review: The requirement states the error message is "Email already registered", but this is not confirmed by UI discovery.
  @dryrun @needs-review @TS-463 @TC-TC1 @TS-468
  Scenario: Registration with an already registered email is rejected
    Given I open the "http://localhost:3000/register" page
    When I attempt to register with the environment user's email
    Then I should see the text "Email already registered"

  @dryrun @TS-462 @TC-TC1 @TS-467
  Scenario: Successful E2E user flow from registration to logout
    Given I open the "http://localhost:3000/register" page
    When I register a new user
    Then I should see the text "Registration successful"
    When I click the "Go to login" link
    And I log in as the new user
    And I enter the OTP
    Then the URL should contain "/dashboard"
    When I navigate from dashboard to profile and back
    And I log out
    Then I should see the "Login" link
